M=$1 
N=$2 

if [ -z $M ] || [ -z $N ]
then
    echo "You must specify both parameters"
    exit 1
fi

for i in `seq 1 $M`
do
    nohup ./e2e-view-keyword.sh $N &> ./e2e-load-test/e2e-view-keywords-$i.out & 
done