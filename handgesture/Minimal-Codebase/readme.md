# Handgesture recognition minimal codebase

## Installation instructions
A virtual environment is strongly recommended. Thus, first set up a virtual environment. Python version 3.9 is verified. <br>
Secondly, install pytorch via pip3. Follow the official [pytorch_installation_tutorial](https://pytorch.org/get-started/locally/) to either install for CUDA and CPU or only for CPU. 
```s
pip3 install torch torchvision
```
Lastly, install remainding libraries:
```s
pip3 install opencv-python
pip3 install pandas
pip3 install scikit-learn
```

## Configure for execution
In [config.json](config.json) the execution can be configured.
|Parameter|description|
|--|--|
|use_cuda|Whether to uses cuda GPU|
|camera_port|0 for local webcam, path to a .mp4 to debug with a mp4 video, and the IPv4 address for a camera on a port|

### IP webcam
To use the camera of an Android phone, download the app IPWebcam and use the functionality `Start server`. Then copy the IPv4 address to config`camera_port` in [config.json](.json).

## Execution
```s
python z_execute.py 
```