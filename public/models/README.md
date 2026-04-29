이 폴더에 ArcFace MobileNet ONNX 모델 파일을 두세요.

파일명: `arcface-mobilefacenet.onnx`

추천 출처:
- https://github.com/onnx/models
- InsightFace의 buffalo_s 팩에서 추출 (mobilefacenet 포함)

모델 입력 스펙:
- Shape: [1, 3, 112, 112] (NCHW)
- dtype: float32
- 정규화: mean=0.5, std=0.5 (픽셀값 0~255 → (x/255 - 0.5) / 0.5)

모델 출력 스펙:
- Shape: [1, 512]
- dtype: float32 (L2 정규화 후 코사인 유사도 사용)
