var kalmanMeanFilter = {
     min:-1,
     max:1,
     dyspersion:0,
     count:0,
     mean:0,
     addValue: function(x) {
         if ( x < this.min) this.min = x;
         if ( x > this.max) this.max = x;
         this.count = this.count+1.0;
         this.dyspersion = ((this.count-1.0)*(this.dyspersion+this.mean*this.mean)+Math.pow(x,2))/this.count;
         this.mean = this.mean + (x - this.mean ) / this.count;
         this.dyspersion = this.dyspersion-this.mean*this.mean;
         return this.mean
        //  return 'dyspersion= '+ this.dyspersion +' '+'mean= '+this.mean
     },
     removeValue: function (x) {
        this.min = 1;
        this.max =-1;
        if (this.count > 1){ 
            this.count = this.count-1;
            this.dyspersion = ((this.count+1.0)*(this.dyspersion+this.mean*this.mean)-Math.pow(x,2))/this.count;
            this.mean = (this.mean*(this.count+1.0)-x)/this.count;
            this.dyspersion = this.dyspersion - this.mean * this.mean;
        }
        return this.mean
        // return 'dyspersion= '+ this.dyspersion +' '+'mean= '+this.mean
     }
     
}
// don`t forget to change type of date for x and у 
var kalmanCovariationFilter = {
    cov:0,
    corr:0,
    count:0,
    addValue: function (xx,yy) {
        var x = kalmanMeanFilter;
        var y = kalmanMeanFilter;
        this.count = this.count + 1.0;
        this.cov = (1.0-1.0/this.count)*(this.cov+(xx-x.mean)*(yy-y.mean)/this.count);
        x.addValue(xx);
        y.addValue(yy);
        if (x.dyspersion != 0 || y.Dyspersion != 0 )  this.corr = this.cov/Math.sqrt(x.dyspersion*y.dyspersion);
        return this.cov
        },
    removeValue: function (xx,yy){
        var x = kalmanMeanFilter;
        var y = kalmanMeanFilter;
        if (this.count > 1) {
            this.count = this.count-1;
            this.cov = ((this.count + 1)/this.count)*(this.cov+x.mean*y.mean)-xx*yy/this.count;
            x.removeValue(xx);y.RemoveValue(yy);
            this.cov =this.cov-x.mean*y.mean;
            if (x.dyspersion !=0 || y.dyspersion != 0) this.corr = this.cov/Math.sqrt(x.dyspersion*y.dyspersion);
        return this.cov
        }
}
}


var kalmanLinearRegressionFilter = {
    a0:0,
    a1:0,
    count:0,
    dyspersion:0,
    r2:0,
    a0:0,
    a1:0,
    result:0,
    addValue: function(xx,yy) {
        
        kalmanCovariationFilter.addValue(xx,yy);
        var x = kalmanMeanFilter;
        var y = kalmanMeanFilter;
        var cov = x;
        this.count = kalmanCovariationFilter.count;
        if (cov.x.dyspersion != 0) {
            
            }
        },
        removeValue: function (xx,yy) {
        var x = kalmanMeanFilter;
        var y = kalmanMeanFilter;
        var cov = x;
        cov.removeValue(xx,yy);
        this.count = cov.count;
        if(cov.x.dyspersion != 0){
            this.a1 = cov.cov/cov.x.dyspersion;
            this.a0 = cov.y.mean-this.a1*cov.x.mean;
            this.dyspersion = cov.y.dyspersion-this.a1*cov.cov;
            if (cov.y.dyspersion != 0) this.r2 = 1-this.dyspersion/cov.y.dyspersion;
            }
        },
        model: function (xx) {
            this.result = this.a0+this.a1*xx;
        }
        
}

// document.write(kalmanMeanFilter.addValue(20));
// document.write('<br>');
// document.write(kalmanMeanFilter.dyspersion);
// document.write('<br>');
// document.write(kalmanMeanFilter.addValue(21));
// document.write('<br>');
// document.write(kalmanMeanFilter.removeValue(20));
// document.write('<br>');
// document.write(kalmanMeanFilter.removeValue(21));
// document.write('<br>');
// document.write(kalmanCovariationFilter.addValue(xx,yy));
// document.write('<br>');



//------------------------------------------------------
var sigma = Number(prompt('write a numbe of sigma-'));
document.write('sigma = '+ sigma.toFixed(4));
document.write('<br>');
for (var i =0; i<1000 ;i++){
    var random = sigma * Math.cos(2*Math.PI*Math.random())*Math.sqrt(-2*Math.log(Math.random()));
    var a = Math.sin(i/60)+random;
    var b=[];
    var c = [];
    b[i] = kalmanMeanFilter.addValue(a);
    c[i] = kalmanCovariationFilter.addValue(b[i].toFixed(4),b[i].toFixed(4));
    
    
    
    
    
    
    document.write(b[i].toFixed(4) +' '+ c[i].toFixed(4));
    document.write('<br>');
    
};
