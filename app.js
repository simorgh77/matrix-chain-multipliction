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
        <input type="text" class="form-control text-right mb-2" id="row${i}" placeholder="سطر ماتریس ${i+1} " data-aos="fade-right" data-aos-delay="1400">
        <input type="text" class="form-control text-right mb-2" id="column${i}" placeholder="ستون ماتریس  ${i+1}" data-aos="fade-left" data-aos-delay="1000">
        `);
    }
    $('.form-group').append(`
    <button type="button" class="btn btn-primary mb-2" id="button"onclick='insert_data()'>تایید</button>
    `);

    
});
let matrix=[];
let r=[];
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

        $(".form-group").remove();

        $('.form').append(`
        <div class="text-white display-3"  data-aos="fade-down">
        کمترین تعداد ضرب ${table[0][number_of_matrix-1]} 
        </div>
        `);



}

