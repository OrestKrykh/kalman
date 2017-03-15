
var li=0;
var i=0;
var nmax =10;
var m=[9];
var lmean=0;



function kalman(li,i,m,lmean,nmax){
    if (i<=nmax-1){
        lmean = (lmean * i + li)/(i+1);
        m[i]=li;
        return lmean
    }else{
        lmean = (lmean  +( li-m[0])/nmax);
        for (var j = 0; j<=nmax-2;j++){
            m[j] = m[j+1];
        }
        m[nmax-1]=li;
    }   return lmean
}

for(var i =0;i <=1000;i++){
    li = Math.sin(i/60)+Math.random(-0.1,0.1);
    // li= i+1;
     if (i<=nmax-1){
        lmean = (lmean * i + li)/(i+1);
        m[i]=li;

    }else{
        lmean = (lmean * (nmax-1) + li-m[0])/nmax;
        for (var j = 0; j<=nmax-2;j++){
            m[j] = m[j+1];
        }
        m[nmax-1]=li;
    } 
    var b = Math.sin(i/60);
    document.write(b.toFixed(4) + ' ');
    document.write(li.toFixed(4)+' ');
    document.write(i + ' ');
    document.write(' ' + lmean.toFixed(4));
    document.write('<br>');
    var ctx = document.getElementById(lmean);
    
    
}