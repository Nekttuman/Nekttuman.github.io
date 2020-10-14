$(document).ready(function(){
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    
    let pic = [
        'masya.jpg',
        'ау.jpg',
        'бадя.png',
        'Биби.png',
        'мохнатый.jpg',
        'падал.png',
        'пин.jpg',
        'хрюндель.jpg',
        'masya.jpg',
        'ау.jpg',
        'бадя.png',
        'Биби.png',
        'мохнатый.jpg',
        'падал.png',
        'пин.jpg',
        'хрюндель.jpg'
    ]
    points = 0

    let tiles = $('.tile img');
    $('.tile img').css('opacity','0');
    for(let i = 0; i < 16; i++){
        n = getRndInteger(0, pic.length-1)
        $(tiles[i]).attr('src',"img/"+pic[n]);
        pic.splice(n,1)
    }

    let after;
    $('.tile img').on('click', function () {
        $(this).css('opacity','1');
        if ($(after).attr('src') == $(this).attr('src')){
            points +=1;
            $('#points').text(points.toString());
            after = ''
        }
        else{
            $(after).css('opacity','0');
            after = this;
        }
        
    });

    

    
    
});