# How to: Shell interaction with Team's Google Drive
Since the team operates with google drive, this markdown illustrates how to integrate 
the google drive into the workflow with the github repo.


## Install rclone
rclone is a command line package to interact with various cloud services. Follow
[rclone.org/install](https://rclone.org/install/) for installation instructions.

### Get started
Verify it is working via
```shell
rclone ls remote:
```
where 'remote' is the name of the created remote in 'rclone config'. The command lists the google drive files of your linked 
google drive account. <br>
Make sure to rename the folder name of the team's google drive from 'Huawei Tech Challenge' to 'tc' or anything without spaces. This won't change anything 
on the team's google drive, it is rather for convenience reasons when working with `rclone`. <br>

## Usage
Sync via 
```shell
rclone sync remote:tc ./gdrive
```
from the root. Make sure to not push gdrive files to the git repo.
See [rclone.org/commands](https://rclone.org/commands/) for more.
