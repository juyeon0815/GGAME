import os
import csv
import numpy as np
from utils import utils
from random import shuffle, sample
import json


# import shutil


# Req. 3-1	이미지 경로 및 캡션 불러오기
def get_path_caption():
    # config.ini에 저장된 캡션 경로와 이미지 경로 호출
    caption_path = utils.config_read('caption_path')
    image_path = utils.config_read('image_path')
    # 캡션이 저장된 csv 파일 읽어오기
    captions_data = [e.strip().split('|') for e in list(map(str, open(caption_path, 'r')))]
    # csv 파일 파싱 [ [img_name1, cap1, cap2, ...], [img_name2, cap1, cap2, ...], ... ]
    captions = []
    pre_img = ''
    for i in range(1, len(captions_data)):
        now_img = captions_data[i][0]
        now_comment = captions_data[i][2]
        if pre_img == now_img:
            captions[-1].append(now_comment)
        else:
            captions.append([now_img, now_comment])
        pre_img = now_img
    # 이미지 경로 및 캡션 리턴
    return image_path, captions


# Req. 3-2	전체 데이터셋을 분리해 저장하기
def dataset_split_save(val_ratio, dataset):
    # 데이터셋 셔플
    shuffle(dataset)
    # 파라미터로 전달된 비율에 따라 데이터를 몇 개씩 나눌지 계산한다.
    val_range = int(val_ratio * len(dataset))
    # json 파일을 만들 딕셔너리
    val_data, train_data = {}, {}

    # 새로운 이미지 폴더
    # if os.path.isdir('.\\datasets\\val_images'):
    #     os.remove('.\\datasets\\val_images')
    # os.makedirs('.\\datasets\\val_images')
    # if os.path.isdir('.\\datasets\\train_images'):
    #     os.remove('.\\datasets\\train_images')
    # os.makedirs('.\\datasets\\train_images')
    # val_data 만들기 data = { img: [캡션1, 캡션2, ...], ... }

    for i in range(val_range):
        img = dataset[i][0]
        # 이미지 새로운 경로에 복사
        # shutil.copy2(f'.\\datasets\\images\\{img}', f'.\\datasets\\val_images\\{img}')
        # 캡션을 딕셔너리에 옮긴다.
        val_data[img] = []
        val_data[img].extend(dataset[i][1:])

    # train_data 만들기 data = { img: [캡션1, 캡션2, ...], ... }
    for i in range(val_range, len(dataset)):
        img = dataset[i][0]
        # 이미지 새로운 경로에 복사
        # shutil.copy2(f'.\\datasets\\images\\{img}', f'.\\datasets\\val_images\\{img}')
        # 캡션을 딕셔너리에 옮긴다.
        train_data[img] = []
        train_data[img].extend(dataset[i][1:])

    # json 파일로 저장
    with open('.\\datasets\\val_data.json', 'w', encoding='utf-8') as json_file:
        json.dump(val_data, json_file, indent='\t')
    with open('.\\datasets\\train_data.json', 'w', encoding='utf-8') as json_file:
        json.dump(train_data, json_file, indent='\t')

    # 경로 리턴
    val_dataset_path = '.\\datasets\\val_data.json'
    train_dataset_path = '.\\datasets\\train_data.json'
    return train_dataset_path, val_dataset_path


# Req. 3-3	저장된 데이터셋 불러오기
def get_data_file(path):
    img_paths = utils.config_read('image_path')
    with open(path) as json_file:
        dataset = json.load(json_file)
    return img_paths, dataset


# Req. 3-4	데이터 샘플링
def sampling_data(img_paths, caption, sample_ratio):
    sp_range = int(sample_ratio * len(caption))
    # caption 에서 샘플 추출
    sp_keys = sample(list(caption), sp_range)
    sp_values = [caption[k] for k in sp_keys]
    sample_caption = dict(zip(sp_keys, sp_values))
    print(f'Total: {len(caption)}, Sample: {len(sample_caption)}, %: {sample_ratio * 100}%')
    return img_paths, sample_caption
