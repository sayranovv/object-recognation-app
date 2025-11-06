# Object Recognation Web App

A full-stack web application for real-time object detection using TensorFlow and SSD MobileNet V2 model. Upload an image and get instant detection results with bounding boxes, categories, and confidence scores.

## 🚀 Features

- Real-time object detection on uploaded images
- Detection of 90+ object categories (COCO dataset)
- RESTful API built with FastAPI
- Modern Angular frontend interface
- Confidence threshold filtering (50%+)
- CORS-enabled for cross-origin requests

## 🛠️ Tech Stack

**Backend:**
- Python 3.9
- FastAPI - Modern web framework
- TensorFlow 2.x - Machine learning
- OpenCV - Image processing
- SSD MobileNet V2 COCO - Pre-trained detection model

**Frontend:**
- Angular
- TypeScript
- HTML/CSS

## 📋 Prerequisites

- Python 3.9
- Node.js 16+ and npm
- pip (Python package manager)

## 🔧 Installation

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Download the pre-trained model:
   - The `ssd_mobilenet_v2_coco` directory should contain the saved_model
   - If not present, download from [TensorFlow Model Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md)

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install npm dependencies:
```bash
npm i
```

## 🚀 Running the Application

### Start the Backend Server

1. Navigate to the server directory:
```bash
cd server
```

2. Run the FastAPI server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

API Documentation (Swagger UI): `http://localhost:8000/docs`

### Start the Frontend Application

1. Navigate to the client directory:
```bash
cd client
```

2. Run the Angular development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200`


## 🎯 Supported Object Categories

The model can detect 90+ categories from the COCO dataset, including:
- People
- Vehicles (car, truck, bus, motorcycle, bicycle)
- Animals (dog, cat, bird, horse, etc.)
- Household items (chair, couch, TV, laptop, etc.)
- Food items
- And many more...

See `label_map.py` for the complete list.

## ⚙️ Configuration

### Confidence Threshold
Default: 0.5 (50%)

To adjust, modify in `main.py`:
```python
if detections['detection_scores'][i] >= 0.5:  # Change this value
```

### CORS Settings
Currently allows all origins. For production, update in `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://yourdomain.com"],  # Specify your domain
    ...
)
```

## 🐛 Troubleshooting

### TensorFlow Warnings
If you see TensorFlow optimization warnings, they're suppressed by:
```python
os.environ["TF_ENABLE_OPTS"] = '0'
```

### CORS Issues
Ensure the backend server is running and CORS middleware is properly configured.

### Model Loading Issues
Verify that `ssd_mobilenet_v2_coco/saved_model` directory exists and contains the model files.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a final project for Python Middle-level course
