import logging
from logging.config import dictConfig
from logging.handlers import SMTPHandler
from os import makedirs, path

import colorlog
from flask import current_app

LOG_FILE_DIR = './log'
class RequestFormatter(colorlog.ColoredFormatter):
    def format(self, record):
        return super().format(record)
    
def init_logger_configuration():
    log_file_dir = './log'
    if not path.exists(log_file_dir):
        makedirs(log_file_dir)
    
    dictConfig({
        'version': 1,
        'formatters': 
            {
            'default': 
                {
                    'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
                },
            'flask_formatter': 
                {
                    '()': lambda: RequestFormatter(
                            '[%(log_color)s%(levelname)s%(reset)s] [%(asctime)s] in %(log_color)s%(blue)s%(module)s%(reset)s: %(log_color)s%(message)s%(reset)s'
                        ),
                }
            },
        'handlers': 
            {
            'stderr': 
                {
                    'level': 'INFO',
                    'formatter': 'flask_formatter',
                    'class': 'colorlog.StreamHandler',
                    'stream': 'ext://flask.logging.wsgi_errors_stream',
                },
            'file':
                {
                    'level': 'INFO',
                    'formatter': 'default',
                    'class': 'logging.handlers.RotatingFileHandler',
                    'maxBytes': 10*1024*1024, #10mb
                    'backupCount': 10,
                    'filename': path.join(LOG_FILE_DIR, 'server.log'),
                },
            },
        'loggers':
            {
            'stderr':
                {
                    'level': 'INFO',
                    'handlers': ['stderr'],
                    'propagate': False,
                },
            'file':
                {
                    'level': 'INFO',
                    'handlers': ['file'],
                    'propagate': False,
                },
            'gunicorn.access': 
                {
                    'level': 'INFO',
                    'handlers': ['stderr', 'file'],
                    'propagate': False,
                },
            'gunicorn.error': 
                {
                    'level': 'ERROR',
                    'handlers': ['file'],
                    'propagate': False,
                },
            },
        'root': 
            {
                'level': 'INFO',
                'handlers': ['stderr', 'file']
            }
    })
    
def init_logger():
    init_logger_configuration()
    # mail_handler = init_mail_handler()
    
    root = logging.getLogger()
    # root.addHandler(mail_handler)
    
def init_mail_handler():
    mail_handler = SMTPHandler(
        mailhost = current_app.config['MAIL_SERVER'],
        fromaddr = current_app.config['MAIL_SERVER_ERROR'],
        toaddrs = current_app.config['MAIL_ADMIN'],
        subject = 'Application Error',
    )
    
    mail_handler.setLevel(logging.ERROR)
    mail_handler.setFormatter(logging.Formatter(
        '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
    ))
    
    return mail_handler
    