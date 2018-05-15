#https://www.michael-bull.com/blog/2017/02/05/e2e-and-stress-testing-using-protractor
N=$1 

for i in `seq 1 $N`
do
    ng e2e -s false --specs ./e2e/manage-keyword-view.e2e-spec.ts 
done