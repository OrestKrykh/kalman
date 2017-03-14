var counter = 1;
var result = 0;
var dispersia = 0;
 

function kalman(value){
    if (counter ===11){
        result = value;
        counter =1;
        dispersia = 0;
        return  'avarage='+ result.toFixed(4) + ' dispersia=' +dispersia.toFixed(4)
    }else{
        dispersia = ((counter-1)/counter)*(dispersia + Math.pow((value - result),2)/counter);
        result = (result * (counter - 1) + value )/counter;
        counter++;
        return 'avarage='+ result.toFixed(4) + ' dispersia=' +dispersia.toFixed(4)
    }
}

for(var i= 1 ; i<11; i++){
    var value = Number(prompt('write number'));
    document.write(kalman(value));
    document.write('<br>');
}