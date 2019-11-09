allFiles=`cat filelist.txt`

for imgFile in $allFiles ;
do
	echo $imgFile
	newName="${imgFile/old/new}"
	magick convert $imgFile -strip -interlace Plane -quality 70% $newName

done