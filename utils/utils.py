from datetime import datetime
import os
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from configparser import ConfigParser
import config


# Req. 2-2	세팅 값 저장
def save_config():
    # 설정 파일 만들기
    config_file = ConfigParser()
    # 설정값 오브젝트로 저장
    config_file['path'] = {}
    config_file['path']['caption_path'] = config.args.caption_file_path
    config_file['path']['image_path'] = config.args.image_file_path
    # 설정 파일 저장
    with open('config.ini', 'w') as configfile:
        config_file.write(configfile)


def config_read(file_path):
    # 설정 파일 읽기
    config_file = ConfigParser()
    config_file.read('config.ini', encoding='utf-8')
    path = config_file['path'][file_path]
    # 테스트용 출력
    print(path)


# Req. 4-1	이미지와 캡션 시각화
def visualize_img_caption():
    pass
