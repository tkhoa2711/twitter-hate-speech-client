N=$1 

for i in `seq 1 $N`
do
    ng e2e -s false --specs ./e2e/manage-keyword-update-nf-volume.e2e-spec.ts 
done