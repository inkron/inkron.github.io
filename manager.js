var socket = io.connect("http://0c61ebc9.ngrok.io")
indexPage = false;
fAdded = false
username = null
page = "home"
privateTimer = null
curruProfile = null
currNotifications = null
currFriends = null
currUserChat = null
currUserChatHistory = null
privateIsTyping = false
function login(sessionKey){
				socket.emit("login", sessionKey)
			}
function sendTyping(){
	privateIsTyping = false;
	console.log("typingEventFalse")
	socket.emit("typingEvent", privateIsTyping, username, currUserChat[0])
}
function render(page){
	if (page === "homeA1"){
		page = "home"
		socket.emit("changePage", page, username)
		$(".friContainer").remove()
		$(".chatContainer").remove()
		$(".defaultText").remove()
		$(".uProfileBox").remove()
		$(".him").attr("src", "app-assets/homeS.svg")
		$("body").css("background-color", "#e7e7e7");
		$(".loginBox").remove()
		$(".sq").remove()
		$(".bottomNav").remove()
		$(".notContainer").remove()
		$(".topNav").remove()
		var name = $("#email").val()
		$("center").append("<div class='topNav'><input class='searchQuery'></input></div>")
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")	
		$("center").append("<div class='defaultText' id='a2'>No New Posts</div>")
		$(".him").attr("src", "app-assets/homeS.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userN.svg")
	}else if(page === "homeA2"){
		page = "home"
		socket.emit("changePage", page, username)
		$(".friContainer").remove()
		$(".chatContainer").remove()
		$(".defaultText").remove()
		$(".notContainer").remove()
		$(".uProfileBox").remove()
		$("body").css("background-color", "#e7e7e7");
		$(".sq").remove()
		$(".bb").remove()
		$(".bottomNav").remove()
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")
		$("center").append("<div class='defaultText' id='a2'>No New Posts</div>")
		$(".him").attr("src", "app-assets/homeS.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userN.svg")
	}else if(page === "sq"){
		page = "sq"
		socket.emit("changePage", page, username)
		$(".friContainer").remove()
		$(".chatContainer").remove()
		$(".defaultText").remove()
		$(".notContainer").remove()
		$(".uProfileBox").remove()
		$("body").css("background-color", "#e7e7e7");
		$(".bottomNav").remove()
		$("center").append("<div class='sq'><div class='sqContainer'></div></div>")
		$(".topNav").append("<div class='bb'><img src='app-assets/backarrow.svg' width='30px' height='30px'></div>")
		$(".sq").append('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')
	}else if(page == ("friendsA1")){
		page = "friends"
		socket.emit("changePage", page, username)
		$(".userChatTopNav").remove()
		$(".chatContainer").remove()
		$(".userChatLeftHalf").remove()
		$(".userChatRightHalf").remove()
		$(".userChatBottomNav").remove()
		$(".friContainer").remove()
		$(".defaultText").remove()
		$(".notContainer").remove()
		$(".uProfileBox").remove()
		$(".topNav").remove()
		$(".bottomNav").remove()
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")
		$("center").append("<div class='friContainer'></div>")
		$(".him").attr("src", "app-assets/homeN.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userS.svg")
	}else if(page == ("mailA1")){
		page = "mail"
		socket.emit("changePage", page, username)
		$(".friContainer").remove()
		$(".chatContainer").remove()
		$(".defaultText").remove()
		$(".topNav").remove()
		$(".uProfileBox").remove()
		$(".notContainer").remove()
		$("center").append("<div class='notContainer'></div>")
		$(".him").attr("src", "app-assets/homeN.svg")
		$(".bim").attr("src", "app-assets/bellS.svg")
		$(".fim").attr("src", "app-assets/userN.svg")
	}else if(page == "uProfileA2"){
		page = "uProfile"
		socket.emit("changePage", page, username)
		$(".defaultText").remove()
		$(".friContainer").remove()
		$(".chatContainer").remove()
		$(".sq").remove()
		$(".bb").remove()
		$(".topNav").remove()
		if (!(fAdded)){
				$("center").append("<div class='uProfileBox'><div class='uProfileMove'><div class='uProfileUsername'>" + curruProfile["username"] + "</div><div class='uProfileName'>" + curruProfile["name"] + "</div><button class='uProfileAddFriend'>Add Friend</button></div></div>")
		}else{
				$("center").append("<div class='uProfileBox'><div class='uProfileMove'><div class='uProfileUsername'>" + curruProfile["username"] + "</div><div class='uProfileName'>" + curruProfile["name"] + "</div><button class='uProfileSendMessage'>Send Message</button></div></div>")
		}
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")

	}else if(page == "userChat"){
		page = "userChat"
		socket.emit("changePage", page, username)
		$(".bottomNav").remove()
		$(".friContainer").remove()
		$(".topNav").remove()
		$("center").append("<div class='userChatTopNav'><div class='bbc'><img src='app-assets/backarrow.svg' width='30px' height='30px'></img></div><div class='userChatUName'>" + currUserChat[0] + "</div><div class='userChatName'>" + currUserChat[1] + "</div></div>")
		$("center").append("<div class='chatContainer'></div>")
		$("center").append("<div class='userChatBottomNav'><form class='usform'><input class='userChatInput'></input></div></div>")
	}
}
$(function(){
	var page = "homeA1"
	var searchShown = false;
	socket.on("loginResponse", function(params, payload){
			if (params === true){
				username = payload[0]
				render(page)
			}else{
				localStorage.removeItem("sessionKey")
				if (indexPage){
					$('center').append('<div class="loginBox"><div class="buttons"><img src="login-files/logo.svg" width="100px" class="logo"><form action="signup.html" method="get"><button class="button" id="b1">signup</button></form><form action="login.html" method="get"><button class="button" id="b2">login</button></form></div></div>')

				}
			}
		})
	socket.on("searchQueryResponse", function(response){
		$(".spinner").remove()
		$(".sqContainer").remove() 
		$(".sq").append("<div class='sqContainer'></div>")
		$(".defaultText").remove()
		if (!(response.length === 0)){
			for (var i in response){
				console.log(i)
				if (i == 0){
						$(".sqContainer").append('<div class="userBox" id="fb">' + response[i] + "</div>")
				}else{
						$(".sqContainer").append('<div class="userBox">' + response[i] + "</div>")
				}
			}
		}else{	
			$("center").append("<div class='defaultText' id='a2'>No users found</div>")
		}
	})

	socket.on("connectToUserResponse", function(chatID, array){
		console.log(array)
		currUserChat = array
		render("userChat")
		socket.emit("getChatHistory", chatID)
	})

	socket.on("incomingMessage", function(payload){
		$(".chatContainer").append("<div class='chatBoxOtherUser'>" + payload[1] + "</div>")
		$('body').animate({scrollTop: $('body').get(0).scrollHeight}, 2000);
	});

	socket.on("getChatHistoryResponse", function(history){
		currUserChatHistory = history
		if(history.length != 0){
			for (var i in history){
				if (history[i][0] === username){
					$(".chatContainer").append("<div class='chatBoxUser'>" + history[i][1] + "</div>")
				}else{
					$(".chatContainer").append("<div class='chatBoxOtherUser'>" + history[i][1] + "</div>")
				}
			}
			$('body').animate({scrollTop: $('body').get(0).scrollHeight}, 2000);
		}
	})

	socket.on("getNotificationsResponse", function(notifications){
		render("mailA1")
		currNotifications = notifications
		if (notifications[0].length != 0){
			$(".defaultText").remove()
			for (var i in notifications[0]){
				if (notifications[1][i] == "friendRequest"){
					if ((parseInt(i) +  1) != notifications[0].length){
						$(".notContainer").append("<div class='notBox' id='friendRequest'>" + notifications[0][i] + " sent you a friend request!<div class='notButtons'><div class='notButton1' id='" + notifications[0][i] + "'><img src='app-assets/checkmark.svg' class='accFriendRequest'></img></div><div class='notButton2' id='" + notifications[0][i] + "'><img src='app-assets/crossmark.svg' class='dismissNotification'></img></div></div></div>")
					}else{
						$(".notContainer").append("<div class='notBoxL' id='friendRequest'>" + notifications[0][i] + " sent you a friend request!<div class='notButtons'><div class='notButton1' id='" + notifications[0][i] + "'><img src='app-assets/checkmark.svg' class='accFriendRequest'></img></div><div class='notButton2' id='" + notifications[0][i] + "'><img src='app-assets/crossmark.svg' class='dismissNotification'></img></div></div></div>")

					}
				}else{
				}
			}
		}else{
			$(".notContainer").append("<div class='defaultText' id='a1'>No New Notifications</div>")
		}
	})

	socket.on("getUserProfileResponse", function(payload, posts, fad){
			fAdded = fad
			console.log(JSON.stringify(payload))
			curruProfile = payload
			if (!(posts.length == 0)){
					render("uProfileA1")
			}else{
					curruPosts = posts
					render("uProfileA2")
			}
	})

	socket.on("typingEventResponse", function(event, user){
		if (event){
			$(".userChatTopNav").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>" + user + " is typing...</div></div>")
		}else{
			$(".typingEvent").remove()
		}
	})

	socket.on("getFriendsResponse", function(friends){
		currFriends = friends
		render("friendsA1")
		if (friends[0].length != 0){
			$(".defaultText").remove()
			for (var i in friends[0]){
					if ((parseInt(i) +  1) != friends[0].length){
						console.log(i + 1)
						console.log(friends[0].length)
						$(".friContainer").append("<div class='friBox'><div class='friBoxUName'>" + friends[0][i] + "</div><div class='friBoxName'>" + friends[1][i] +"</div><div class='friButtons'><button class='friButton1' id='" + friends[0][i] + "'>Send Message</button><button class='friButton2' id='" + friends[0][i] + "'>Remove</button></div></div>")
					}else{
						$(".friContainer").append("<div class='friBoxL'><div class='friBoxUName'>" + friends[0][i] + "</div><div class='friBoxName'>" + friends[1][i] +"</div><div class='friButtons'><button class='friButton1' id='" + friends[0][i] + "'>Send Message</button><button class='friButton2' id='" + friends[0][i] + "'>Remove</button></div></div>")
					}
			}
		}else{
			$(".friContainer").append("<div class='defaultText' id='a1'>Friend List Empty</div>")
		}
	})

	$('body').on('input', '.searchQuery', function(){
		if($('.searchQuery').val().length >= 2){
			if (!(searchShown)){
					render("sq")
					searchShown = true
				}
			socket.emit("searchQuery", $('.searchQuery').val(), username)
		}else if (searchShown){
			render("homeA2")
			searchShown = false
		}
	});
	$('body').on('click', '.bb', function(){
		$(".searchQuery").val("")
		render("homeA2")
		searchShown = false
	});
	$('body').on('click', '.bbc', function(){
		socket.emit("disconnectFromChat", username)
		socket.emit("getFriends", username)
	});
	$('body').on('click', '#friends', function(){
		if (!(page === "friends")){
			socket.emit("getFriends", username)
		}
	});
	$('body').on('click', '#home', function(){
		if (!(page === "home")){
			render("homeA1")
		}
	});
	$('body').on('click', '#mail', function(){
		if (!(page === "mail")){
			socket.emit("getNotifications", username)
		}
	});
	$('body').on('click', '.userBox', function(){
		socket.emit("getUserProfile", $(this).text(), username)
	})
	$('body').on('click', '.uProfileAddFriend', function(){
		socket.emit("addFriend", curruProfile["username"], username)
	})
	$('body').on('click', ".notButton1", function(){
		var user = $(this).attr("id")
		socket.emit("acceptFriendRequest", user, username)
		$(this).parent().parent().remove()
		currNotifications[0].splice(currNotifications[0].indexOf(user), 1)
		currNotifications[1].splice(currNotifications[0].indexOf(user), 1)
		socket.emit("removeNotification", currNotifications[0].indexOf(user), username)
		if (currNotifications[0].length == 0){
			$("center").append("<div class='defaultText' id='a1'>No new notifications</div>")
		}
	})
	$('body').on('click', ".notButton2", function(){
		var user = $(this).attr("id")
		$(this).parent().parent().remove()
		currNotifications[0].splice(currNotifications[0].indexOf(user), 1)
		currNotifications[1].splice(currNotifications[0].indexOf(user), 1)
		socket.emit("removeNotification", currNotifications[0].indexOf(user), username)
		if (currNotifications[0].length == 0){
			$("center").append("<div class='defaultText' id='a1'>No new notifications</div>")
		}else{
			$(".notContainer").children().last().attr("class", "notBoxL")
		}
	})
	$('body').on('click', ".friButton1", function(){
		var user = $(this).attr("id")
		socket.emit("connectToUser", user, username)
	});
	$('body').on('click', ".friButton2", function(){
		var user = $(this).attr("id")
		$(this).parent().parent().remove()
		currFriends[0].splice(currFriends[0].indexOf(user), 1)
		currFriends[1].splice(currFriends[0].indexOf(user), 1)
		socket.emit("removeFriend", user, username)
		if (currFriends[0].length == 0){
			$("center").append("<div class='defaultText' id='a1'>Friend List Empty</div>")
		}else{
			$(".friContainer").children().last().attr("class", "friBoxL")
		}
	});
	$('body').on('submit', '.usform', function(e){
		e.preventDefault();
		$(".chatContainer").append("<div class='chatBoxUser'>" + $(".userChatInput").val() + "</div>")
		socket.emit("sendMessage", $(".userChatInput").val(), username, currUserChat[0])
		sendTyping()
		$('body').animate({scrollTop: $('body').get(0).scrollHeight}, 2000);
		$(".userChatInput").val("")
	})
	$('body').on('focus', '.userChatInput', function(){
		$('body').animate({scrollTop: $('body').get(0).scrollHeight}, 2000);
	})
	$('body').on('keydown', '.userChatInput', function(){
		if (!(privateIsTyping)){
			privateIsTyping = true
			console.log("typingEventTrue")
			socket.emit("typingEvent", privateIsTyping, username, currUserChat[0])
		}
			clearTimeout(privateTimer)
			privateTimer = setTimeout(sendTyping, 1000)
	})
})
