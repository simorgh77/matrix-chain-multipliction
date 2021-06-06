let matrix=[];
let r=[];
AOS.init();
let number_of_matrix;   
$(".form").submit(function (e) { 
    e.preventDefault();
     number_of_matrix=$("#matrix").val();
    $('.form')[0].reset();

    $('#matrix ').remove();
    $('#submit ').remove();

    $('#submit').attr("id","new_submit")
    for(let i=0;i<number_of_matrix;i++){
        $('.form-group').append(`
        <input type="text" class="form-control text-right mb-2" id="row${i}" placeholder="سطر ماتریس ${i+1} " data-aos="fade-right" data-aos-duration="1400">
        <input type="text" class="form-control text-right mb-2" id="column${i}" placeholder="ستون ماتریس  ${i+1}" data-aos="fade-left" data-aos-duration="1000">
        `);
    }
    $('.form-group').append(`
    <button type="button" class="btn btn-primary mb-2" id="button"onclick="insert_data()">تایید</button>
    `);
});
function insert_data(){
    
for (let index = 0; index <number_of_matrix; index++) {
    let temp=[]
    let row=$(`#row${index}`).val();
    let column=$(`#column${index}`).val();
    temp.push(parseInt(row))
    temp.push(parseInt(column))
    matrix.push(temp)

    index==number_of_matrix-1?r.push(parseInt(row))&&r.push(parseInt(column)):r.push(parseInt(row))
}

    let path=[]
    let table=[];
     for(let i=0;i<number_of_matrix;i++){
        table[i]=new Array(number_of_matrix)
        path[i]=new Array(number_of_matrix)
        for(let j=0;j<number_of_matrix;j++){
            path[i][j]=0
        i==j?   table[i][j]=0  : table[i][j]=Number.MAX_VALUE
        }
    }
  


    for(m = 0 ; m < number_of_matrix-1 ; m++){
    
        for(j = m+1,i=0 ; j < number_of_matrix  ; j++,i++){
           
                for (let k = i; j < number_of_matrix && k < j ; k++)
                {
                    let cost = table[i][k] + table[k + 1][j] + r[i] * r[k+1] * r[j+1];
                    if (cost < table[i][j]) {
                        table[i][j] = cost;
                        path[i][j]=k+1
                    }
                }
            }
        }
        let temp=[]

        debugger
        for(let i=0;i<number_of_matrix;i++){
            path[i].unshift(0);
            temp[i]=0
        }
        temp[number_of_matrix]=0;
        path.unshift(temp)
       let result=printParenthesis(1,number_of_matrix,number_of_matrix+1,path)
       
        
       $(".form-group").remove();
       
       $(".form").append(`
       <div class="text-white display-3"  data-aos="fade-down"  data-aos-duration="1000">
       کمترین تعداد ضرب ${table[0][number_of_matrix - 1]} 
       </div>
       <div class="text-white display-3 mt-4 ml-4"  data-aos="fade-down"  data-aos-duration="1000">
        ${result} 
       </div>`);
}
