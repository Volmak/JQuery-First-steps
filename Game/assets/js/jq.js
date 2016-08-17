
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
var playerSpeed = 1;
var bulletSpeed = 1;

var downUp = false;	//flag za pusnat klavish DOWN, polzva se za otchitane na double-click
var canGetUp = true;//zabraniava izpravianeto po vreme na kliakane, animaciite ne se natrupvat
var isDown = false;	//kleknal? zaedno s downUp se izpolzva za liagane sled dvoino natiskane na DOWN
var laying = false;	//legnal?
var canMove = true;	//dvijenieto po vreme na goliam skok i lejene sa zabraneni
var jumped = false;	//flag za skok, zabraniava natrupvaneto na animacii
var jumping = false;//flag za 1-vata polovina ot skoka, povtorno natiskane na UP vodi do dvoen skok
var superjumping = false; //sjuji za izbiagvane na bugove po vreme na golemia skok
var upUp = false;	//flag used to detect double UP. Smoothins superjumping
var positionX;		//offset().left vuv vw
var tooFar = false;	//flag for going too far to the right;

var points = -1; //1-viat istrel se otchita kato tochka
var hp = 3;

$(function (){
	$(document).on('keydown', keydown);
	$(document).on('keyup', keyup);
	setTimeout(bullets, 2000);
});


							/* MOVEMENT SECTION */

function keydown(e){
	if (e.keyCode == LEFT && canMove){
		move (-playerSpeed);
	}
	if (e.keyCode == RIGHT){
		move (playerSpeed);
	}
	if (e.keyCode == UP){
		if (laying){
			downUp=true;
			canMove = true;
			up ();
			laying=false;
		}
		if(!jumped && !superjumping){
			jumped = true;
			jump ();
		} else if (jumped && jumping && upUp && !superjumping && !tooFar) {
			superjump ();
		}
		upUp = false;
	}
	if (e.keyCode == DOWN){
		 if(!isDown && canGetUp){
			isDown = true;
			down();
		 } else if (isDown && downUp && canGetUp){
			 canGetUp = false;
			 laying=true;
			 layDown();
			 downUp = false;
		 }
	}
}

function keyup(e){
	if (e.keyCode == UP && jumping){
		upUp = true;
	}
	if (e.keyCode == DOWN && canGetUp){
		downUp=true;
		canMove = true;
		up ();
		laying=false;
	}
}

function move(sp){
	positionX = $('#player').offset().left * 100 / window.innerWidth;
	var moveTo = positionX + sp;
	if (moveTo < 0 || moveTo > 80) {
		return;
	}
	$('#player').css({left: moveTo + 'vw'});
};

function jump(){
	jumping = true;
	$('#player').animate({bottom: "15vh",}, 500, function (){
		jumping = false;
		$('#player').animate({bottom: "0vh"}, 300, function (){
			jumped = false;
		})
	});
};

function superjump(){
	superjumping = true;
	positionX = $('#player').offset().left * 100 / window.innerWidth;
	canMove = false;
	var howFar = positionX + 40;
	if (howFar > 80) {
		howFar = howFar - 80;
		$("#player img").toggleClass("backwards");
	}
	$("#player img").css({display:"inline-block"});
	$("audio")[0].currentTime = 0;
	$("audio")[0].play();
	$('#player').animate({bottom: "60vh", left: howFar + 'vw'}, 500, function (){
		$("#player img").css({display:"none"});
		if (howFar < positionX){
			$("#player img").toggleClass("backwards");
		}
		$('#player').animate({bottom: "0vh"}, 500, function (){
			$("audio")[0].pause();
			superjumping = jumped = false;
			canMove = true;
		})
	});
}

function down(){
	jumped = true;
	$('#player').animate({height: "10vh"}, 200);
};

function up (){
	var getUpTime = laying ? 800 : 100;
	superjumping = jumped = false;
	$('#player').animate({height: "20vh", width: '5vw'}, getUpTime, function(){isDown = false, downUp=false});
}

function layDown(){
	jumped = true;
	canMove = false;
	$('#player').animate({height: "5vh", width: '10vw'}, 200, function (){isDown = true, canGetUp=true});
}


							/* BULLETS SECTION */

function bullets () {
	var howFar = ($('.dodge').offset().left * 100 / window.innerWidth) - bulletSpeed;
	$('.dodge').css({left: howFar + 'vw'});
	
	var pLeft = $('#player').offset().left;
	var pRight = pLeft + $('#player').outerWidth(true);
	var pTop = $('#player').offset().top;
	var pBot = pTop + $('#player').outerHeight(true);
	
	var bLeft = $('.dodge').offset().left;
	var bRight = bLeft + $('.dodge').outerWidth(true);
	var bTop = $('.dodge').offset().top;
	var bBot = bTop + $('.dodge').outerHeight(true);
	
	if (pLeft < bRight && pRight > bLeft && pTop < bBot && pBot > bTop){
		howFar = 0;
		hp--;
		$('#hp').html(hp);
		points--;
		if (hp <= 0) {	
			alert('YOU LOST!!! But it\'s not GAME OVER!\nThe game will now restart!');
			location.reload ();
		}
	}
	
	if (howFar <= 1) {
		points++;
		$('#points').html(points);
		if (points >= 20) {
			alert('CONGRATULATIONS!!! YOU WON!!! \nThe game will now restart!');
			location.reload ();
		}
		
		var hight = Math.floor(Math.random() * 3);
		var strrpr;
		switch (hight){
		case 0: strrpr = 'dodge low'; break;
		case 1: strrpr = 'dodge middle'; break;
		case 2: strrpr = 'dodge high'; break;
		};
		$(".dodge").css({left: '97vw'});
		$('.dodge').attr('class', strrpr);
	};

	requestAnimationFrame(bullets);
}