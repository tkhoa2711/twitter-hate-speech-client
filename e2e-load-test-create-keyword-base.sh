M=$1 
N=$2 

if [ -z $M ] || [ -z $N ]
then
    echo "You must specify both parameters"
    exit 1
fi

for i in `seq 1 $M`
do
    nohup ./e2e-create-keyword-base.sh $N &> ./e2e-load-test-result/create/base/e2e-create-keyword-base-$i.out & 
done