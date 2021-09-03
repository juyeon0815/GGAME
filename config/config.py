import argparse

# Req. 2-1	Config.py 파일 생성

parser = argparse.ArgumentParser(description='Process datasets.')
# 캡션 데이터가 있는 파일 경로
parser.add_argument('--caption_file_path', type=str, default='.\\datasets\\captions.csv')
# 이미지 파일들이 저장된 경로
parser.add_argument('--image_file_path', type=str, default='.\\datasets\\images')

# Req. 3-2 val_ratio
parser.add_argument('val_ratio', type=float)

# Req. 3-3 dataset_path (path: train / val)
parser.add_argument('dataset_path', type=str)

# Req. 3-4 do_sampling
# parser.add_argument('--do_sampling', action='store_true')
parser.add_argument('--do_sampling', type=float)
# parser.add_argument('sample_ratio', type=float)

args = parser.parse_args()

val_ratio = args.val_ratio
dataset_path = args.dataset_path
do_sampling = sample_ratio =args.do_sampling
# sample_ratio = args.sample_ratio

print(f'val_ratio: {val_ratio * 100}%')
print(f'do_sampling: {do_sampling}')
# print(args.caption_file_path)
# print(args.image_file_path)
