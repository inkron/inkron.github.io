var socket = io.connect("https://cce7e4b7.ngrok.io")
indexPage = false
fAdded = false
username = null
fullname = null
page = "home"
privateTimer = null
curruProfile = null
currNotifications = null
currFriends = null
currUserChat = null
currUserChatHistory = null
privateIsTyping = false
createGroup = [[],[]]
addToGroup = [[], []]
chatType = 1
currUserData = null
glChatId = null
friendsFirst = false
glOnUser = null
usersTyping = []


function login(sessionKey){
				socket.emit("login", sessionKey)
			}
function sendTyping(){
	privateIsTyping = false;
	console.log("typingEventFalse")
	socket.emit("typingEvent", privateIsTyping, username, glChatId)
}

function scrollTopPls(){
	window.scrollTo(0,0)
}

function removeAssets(exceptions){
	var assets = [".bb",".fgs", ".gc", ".friContainer", ".chatContainer", ".userChatGlobal", ".gs", ".defaultText", ".uProfileBox", ".loginBox", ".sq", ".bottomNav", ".notContainer", ".topNav", ".defaultText"]
	var x = false
	for (var i in assets){
		if (!(exceptions.includes(assets[i]))){
			$(assets[i]).remove() 
		}
	}
	return x
}

function checkForSpace(){

}

function renderFGS(data){
	if (data[0].length != 0){
			render("friendsFGSA1")
			for (var i in data[0]){
				$(".fgsContainer").append("<div class='fgsFriendBox'><div class='fgsBoxUName'>" + data[0][i] + "</div><div class='fgsBoxName'>" + data[1][i] + "</div><button class='fgsSelector'></button></div>")

			}
		}else{
			render("friendsFGSA2")
			$(".fgsContainer").append("<div class='defaultText' id='a1'>Friend List Empty</div>")
		}
}

function renderGroupSettings(data){
	console.log(data)
		render("chatSettingsA2")
		for (var i in data[0]){
				if (!(data[0][i] == username)){
					if (data[1][data[0].indexOf(username)] == "admin"){
						if (data[1][i] == "admin"){
						$(".gsContainer").append("<div class='gsFriendBox'><div class='gsBoxUName'>" + data[0][i] + "</div><div class='gsBoxName2'>" + data[1][i] + "</div><button class='gsSelector1'>Kick</button><button class='gsSelector3'>Demote</button></div>")

						}else{
							$(".gsContainer").append("<div class='gsFriendBox'><div class='gsBoxUName'>" + data[0][i] + "</div><div class='gsBoxName1'>" + data[1][i] + "</div><button class='gsSelector1'>Kick</button><button class='gsSelector2'>Promote</button></div>")
						}
					}else{
						if (data[1][i] == "admin"){
						$(".gsContainer").append("<div class='gsFriendBox'><div class='gsBoxUName'>" + data[0][i] + "</div><div class='gsBoxName2'>" + data[1][i] + "</div></div>")

						}else{
							$(".gsContainer").append("<div class='gsFriendBox'><div class='gsBoxUName'>" + data[0][i] + "</div><div class='gsBoxName1'>" + data[1][i] + "</div></div>")
						}

					}
				}else{
					if (data[1][i] == "admin"){
						$(".gsContainer").append("<div class='gsFriendBox'><div class='gsBoxUName'>You</div><div class='gsBoxName2'>" + data[1][i] + "</div></div>")
				}else{
						$(".gsContainer").append("<div class='gsFriendBox'><div class='gsBoxUName'>You</div><div class='gsBoxName1'>" + data[1][i] + "</div></div>")
				}

				}
		}
}

function render(pageRequest){
	$('body').scrollTop(0)
	if (pageRequest === "homeA1"){
		page = "home"
		socket.emit("changePage", page, username, null)
		removeAssets([])
		$(".him").attr("src", "app-assets/homeS.svg")
		$("body").css("background-color", "#e7e7e7");
		var name = $("#email").val()
		$("center").append("<div class='topNav'><input class='searchQuery' placeholder='Search Users'></input></div>")
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")	
		$("center").append("<div class='defaultText' id='a2'>No New Posts</div>")
		$(".him").attr("src", "app-assets/homeS.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userN.svg")
	}else if(pageRequest === "homeA2"){
		page = "home"
		socket.emit("changePage", page, username, null)
		removeAssets(['.topNav', '.bottomNav'])
		$("body").css("background-color", "#e7e7e7");
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")
		$("center").append("<div class='defaultText' id='a2'>No New Posts</div>")
		$(".him").attr("src", "app-assets/homeS.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userN.svg")
	}else if (pageRequest == "homeA3"){
		page = "home"
		socket.emit("changePage", page, username, null)
		removeAssets(['.topNav', '.bottomNav'])
		$("body").css("background-color", "#e7e7e7");
		$("center").append("<div class='topNav'><input class='searchQuery' placeholder='Search Users'></input></div>")
		$("center").append("<div class='defaultText' id='a2'>No New Posts</div>")
		$(".him").attr("src", "app-assets/homeS.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userN.svg")
	}else if(pageRequest === "sq"){
		page = "sq"
		socket.emit("changePage", page, username, null)
		removeAssets([".topNav"])
		$("body").css("background-color", "#e7e7e7");
		$("center").append("<div class='sq'><div class='sqContainer'></div></div>")
		$(".topNav").append("<div class='bb'><img src='app-assets/backarrow.svg' width='30px' height='30px'></div>")
		$(".sq").append('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')
	}else if(pageRequest == ("friendsA1")){
		page = "friends"
		console.log("called")
		socket.emit("changePage", page, username, glChatId)
		removeAssets([])
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")
		$("center").append("<div class='friContainer'></div>")
		$(".him").attr("src", "app-assets/homeN.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userS.svg")
	}else if(pageRequest == "friendsA2"){
		page = "friends"
		socket.emit("changePage", page, username, glChatId)
		removeAssets([".bottomNav"])
		$("center").append("<div class='friContainer'></div>")
		$(".him").attr("src", "app-assets/homeN.svg")
		$(".bim").attr("src", "app-assets/bellN.svg")
		$(".fim").attr("src", "app-assets/userS.svg")

	}else if(pageRequest == ("mailA1")){
		removeAssets([".bottomNav"])
		page = "mail"
		socket.emit("changePage", page, username, null)
		$("center").append("<div class='notContainer'></div>")
		$(".him").attr("src", "app-assets/homeN.svg")
		$(".bim").attr("src", "app-assets/bellS.svg")
		$(".fim").attr("src", "app-assets/userN.svg")
	}else if(pageRequest == "uProfileA2"){
		removeAssets([])
		page = "uProfile"
		socket.emit("changePage", page, username, null)
		if (!(fAdded)){
				$("center").append("<div class='uProfileBox'><div class='uProfileMove'><div class='uProfileUsername'>" + curruProfile["username"] + "</div><div class='uProfileName'>" + curruProfile["name"] + "</div><button class='uProfileAddFriend'>Add Friend</button></div></div>")
		}else{
				$("center").append("<div class='uProfileBox'><div class='uProfileMove'><div class='uProfileUsername'>" + curruProfile["username"] + "</div><div class='uProfileName'>" + curruProfile["name"] + "</div><button class='uProfileSendMessage'>Remove Friend</button></div></div>")
		}
		$("center").append("<div class='bottomNav'><div class='bnButton' id='friends'><img class='fim' id='Image' src='app-assets/userN.svg'></img></div><div class='bnButton' id='home'><img class='him' id='Image' src='app-assets/homeN.svg'></img></div><div class='bnButton' id='mail'><img class='bim' id='Image' src='app-assets/bellN.svg'></img></div></div>")

	}else if(pageRequest == "userChat"){
		removeAssets([])
		page = "userChat"
		socket.emit("changePage", page, username, glChatId)
		$("center").append("<div class='userChatGlobal'></div>")
		$(".userChatGlobal").append("<div class='userChatTopNav'><div class='bbc'><img class='uCBA' src='app-assets/backarrow.svg' width='30px' height='30px'></img></div><div class='userClickArea'><div class='userChatUName'>" + currUserChat[0] + "</div><div class='userChatName'>" + currUserChat[1] + "</div></div></div>")
		$("body").append("<div class='chatContainer'></div>")
		$(".userChatGlobal").append("<div class='userChatBottomNav'><form class='usform'><input class='userChatInput'></input></div></div>")
	}else if(pageRequest == "groupCreate"){
		page = "groupCreate"
		socket.emit("changePage", page, username, null)
		createGroup = [[username], [fullname]]
		removeAssets([])
		$("center").append("<div class='gc'><div class='gcTopNav'><div class='bbc'><img class='uCBA' src='app-assets/backarrow.svg' width='30px' height='30px'></img></div><div class='gcTitle'>Create Group</div></div><div class='gcInputDiv'><div class='gcTitle2'>Choose a name</div><input class='gcGroupName' placeholder='Desired Group Name'></input></div></button><div class='gcTitle3'>Add Friends</div><div class='gcContainer'></div><button class='gcCreateButton'>Create</button></div>")
	}else if(pageRequest =="chatSettings"){
		page = "chatSettings"
		if (chatType == 1){
			socket.emit("changePage", page, username, null)
			socket.emit("getUserProfile", currUserChat[0], username)
		}else if(chatType ==2){
			page = "groupSettings"
			socket.emit("changePage", page, username, glChatId)
			socket.emit("groupSettings", glChatId)
		}

	}else if(pageRequest == "chatSettingsA2"){
		page = "groupSettings"
		removeAssets([])
		$("center").append("<div class='gs'><div class='gsTopNav'><div class='bbc'><img class='uCBA' src='app-assets/backarrow.svg' width='30px' height='30px'></img></div><div class='gsTitle'>Group Settings</div></div><div class='gsTitle2'>Member List</div><div class='gsContainer'></div><div class='gsb'><button class='gsAddMembers'>Add Members</button></div><div class='gsb'><button class='gsLeaveGroup'>Leave Group</button></div></div>")

	}else if(pageRequest == "friendsFGSA1"){
		addToGroup = [[],[]]
		page = "friendsFGS"
		removeAssets([])
		socket.emit("changePage", "friendsFGS", username, glChatId)
		$("center").append("<div class='fgs'><div class='fgsTopNav'><div class='bbc'><img class='uCBA' src='app-assets/backarrow.svg' width='30px' height='30px'></img></div><div class='fgsTitle'>Add Members</div></div><div class='fgsTitle2'>Friends</div><div class='fgsContainer'></div><div class='gsb'><button class='fgsAddMembers'>Add Members</button></div>")
	}else if(pageRequest == "friendsFGSA2"){
		page = "friendsFGS"
		removeAssets([])
		socket.emit("changePage", "friendsFGS", username, glChatId)
		$("center").append("<div class='fgs'><div class='fgsTopNav'><div class='bbc'><img class='uCBA' src='app-assets/backarrow.svg' width='30px' height='30px'></img></div><div class='fgsTitle'>Add Members</div></div><div class='fgsContainer'></div></div>")

	}
}
$(function(){
	var searchShown = false;

	socket.on("loginResponse", function(params, payload){
			if (params === true){
				username = payload[0]
				fullname = payload[2]
				render("homeA1")
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

	socket.on("connectToUserResponse", function(chatID, array, param){
		console.log(array)
		if (param){
			chatType = 2;
		}else{
			chatType = 1;
		}
		currUserChat = array
		glChatId = chatID
		render("userChat")
		socket.emit("getChatHistory", chatID)
	})

	socket.on("incomingMessage", function(payload){
		console.log("oi")
		if (payload[0] != username){
				if (chatType == 1){
						$(".chatContainer").append("<div class='cboum'><div class='cbour'><div class='chatBoxOtherUser'>" + payload[1] + "</div></div></div>")
					}else{
						if (payload[0] != glOnUser){
							$(".chatContainer").append("<div class='cboum'><div class='cbour'><div class='chatBoxOtherUser2'><div id='chatBoxAuthor' class='gcb" + payload[0] + "'>" + payload[0] + "</div><br><div class='chatBoxOUContent'>" + payload[1] + "</div></div></div></div>")
							if (currUserData[0].includes(payload[0])){
								var rgbArr = currUserData[2][currUserData[0].indexOf(payload[0])]
								$('.gcb' + payload[0]).css("color", "rgb(" + rgbArr[0] + ", " + rgbArr[1] + " , " + rgbArr[2] + ")")
							}
							glOnUser = payload[0]
						}else{
							$(".chatContainer").append("<div class='cboum'><div class='cbour'><div class='chatBoxOtherUser2'><div class='chatBoxOUContent2'>" + payload[1] + "</div></div></div></div>")
						}
					}
		}else{
			$(".chatContainer").append("<div class='cbum'><div class='cbur'><div class='chatBoxUser' dir='ltr'>" + payload[1] + "</div></div></div>")
			glOnUser = null
		}
		$('body').animate({scrollTop: $('body').get(0).scrollHeight}, 2000);
	});

	socket.on("getChatHistoryResponse", function(history){
		currUserChatHistory = history
		var onUser = null
		glOnUser = null
		if(history.length != 0){
			for (var i in history){
				if (history[i][0] === username){
					onUser = null
					$(".chatContainer").append("<div class='cbum'><div class='cbur'><div class='chatBoxUser' dir='ltr'>" + history[i][1] + "</div></div></div>")
				}else{
					if (chatType == 1){
						$(".chatContainer").append("<div class='cboum'><div class='cbour'><div class='chatBoxOtherUser'>" + history[i][1] + "</div></div></div>")
					}else{
						if (onUser != history[i][0]){
							$(".chatContainer").append("<div class='cboum'><div class='cbour'><div class='chatBoxOtherUser2'><div id='chatBoxAuthor' class='gcb" + history[i][0] + "'>" + history[i][0] + "</div><br><div class='chatBoxOUContent'>" + history[i][1] + "</div></div></div></div>")
							if (currUserData[0].includes(history[i][0])){
								var rgbArr = currUserData[2][currUserData[0].indexOf(history[i][0])]
								$('.gcb' + history[i][0]).css("color", "rgb(" + rgbArr[0] + ", " + rgbArr[1] + " , " + rgbArr[2] + ")")
							}
							onUser = history[i][0]
						}else{
							$(".chatContainer").append("<div class='cboum'><div class='cbour'><div class='chatBoxOtherUser2'><div class='chatBoxOUContent2'>" + history[i][1] + "</div></div></div></div>")
						}
					}
				}
			}
			console.log("oof")
			$('body').animate({scrollTop: $('body').get(0).scrollHeight}, 2000);
		}
	})

	socket.on("updateUserData", function(data, user){
		console.log("updating data")
		currUserData = data;
		if (page == "userChat"){
			if (chatType == 2){
				$(".userChatName").text(data[0])
			}
		}else if(page =="groupSettings"){
			renderGroupSettings(data)
		}else if (page =="friendsFGS"){
			if (user != username){
					socket.emit("getFriendsFGS", username, glChatId)
				}
		}
		if (user == username){
			console.log("ROFL")
			render("friendsA1")
			socket.emit("getChats", username)
		}
	})

	socket.on("getNotificationsResponse", function(notifications){
		if (!(page == "mail")){
			render("mailA1")
		}
		currNotifications = notifications
		if (notifications[0].length != 0){
			$(".defaultText").remove()
			for (var i in notifications[0]){
				if (notifications[1][i] == "friendRequest"){
					if ((parseInt(i) +  1) != notifications[0].length){
						$(".notContainer").append("<div class='notBox' id='friendRequest'><div class='notBoxUName'>" + notifications[0][i] + "</div><div class='notBoxName'>sent you a friend request!</div><div class='notButtons'><div class='notButton2' id='" + notifications[0][i] + "'><img src='app-assets/crossmark.svg' class='dismissNotification'></img></div><div class='notButton1' id='" + notifications[0][i] + "'><img src='app-assets/checkmark.svg' class='accFriendRequest'></img></div></div></div>")

					}else{
						$(".notContainer").append("<div class='notBoxL' id='friendRequest'><div class='notBoxUName'>" + notifications[0][i] + "</div><div class='notBoxName'>sent you a friend request!</div><div class='notButtons'><div class='notButton2' id='" + notifications[0][i] + "'><img src='app-assets/crossmark.svg' class='dismissNotification'></img></div><div class='notButton1' id='" + notifications[0][i] + "'><img src='app-assets/checkmark.svg' class='accFriendRequest'></img></div></div></div>")

					}
				}else{
				}
			}
		}else{
			$(".notContainer").append("<div class='defaultText' id='a1'>No New Notifications</div>")
		}
	})

	socket.on("createGroupResponse", function(name){
		socket.emit("connectToUser", false, name, username)
	})

	socket.on("groupSettingsResponse", function(data){
		renderGroupSettings(data)
	});

	socket.on("getUserProfileResponse", function(payload, posts, fad){
			fAdded = fad
			console.log(JSON.stringify(payload))
			curruProfile = payload
			render("uProfileA2")
	})

	socket.on('getFriendsFNGResponse', function(data){
		render('groupCreate')
		if (data.length != 0){
			for (var i in data[0]){
				if (!(data[0].length == parseInt(i) + 1)){
					$(".gcContainer").append("<div class='gcFriendBox'><div class='gcBoxUName'>" + data[0][i] + "</div><div class='gcBoxName'>" + data[1][i] + "</div><div class='gcSelector'></div></div>")

				}else{
					$(".gcContainer").append("<div class='gcFriendBox2'><div class='gcBoxUName'>" + data[0][i] + "</div><div class='gcBoxName'>" + data[1][i] + "</div><div class='gcSelector'></div></div>")

				}
			}
		}

	})

	socket.on('getFriendsFGSResponse', function(data){
		renderFGS(data)
	})

	socket.on("typingEventResponse", function(event, user){
		if (event){
			$(".typingEvent").remove()
			if (!(usersTyping.includes(user))){
				usersTyping.push(user)
			}
			if (usersTyping.length == 1){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>" + usersTyping[0] + " is typing...</div></div>")
			}else if (usersTyping.length == 2){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>" + usersTyping[0] + " and " + usersTyping[1] +" are typing...</div></div>")
			}else if (usersTyping.length == 3){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>" + usersTyping[0] + ", " + usersTyping[1] + "and " + usersTyping[2] +" are typing...</div></div>")
			}else if (usersTyping.length > 3){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>Multiple people are typing...</div></div>")
			}
		}else{
			usersTyping.splice(usersTyping.indexOf(user), 1)
			$(".typingEvent").remove()
			if (usersTyping.length == 1){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>" + usersTyping[0] + " is typing...</div></div>")
			}else if (usersTyping.length == 2){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>" + usersTyping[0] + " and " + usersTyping[1] +" are typing...</div></div>")
			}else if (usersTyping.length == 3){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>" + usersTyping[0] + ", " + usersTyping[1] + "and " + usersTyping[2] +" are typing...</div></div>")
			}else if (usersTyping.length > 3){
				$(".userClickArea").append("<div class='typingEvent'><div class='chatBoxUserTypingText'>Multiple people are typing...</div></div>")
			}
		}
	})

	socket.on("getChatsResponse", function(friends, das){
		currFriends = friends
		var dasCounter = 0
		if (friends[0].length != 0){
			$(".defaultText").remove()
			for (var i in friends[0]){
					if (friends[1][i] != 0){
						$(".friContainer").append("<div class='friBox'><div class='friBoxUName'>" + friends[0][i] + "</div><div class='friBoxName'>" + friends[1][i] +"</div><div class='friButtons'><button class='friButton1' id='" + friends[2][i] + "'>Send Message</button></div></div>")
					}else{
						$(".friContainer").append("<div class='friBox'><img class='gIcon' src='app-assets/groupMessagesIcon.svg'></img><div class='friBoxUName'>" + friends[0][i] + "</div><div class='friBoxName'>" + friends[1][i] +"</div><div class='friButtons'><button class='friButton1g' id='" + friends[2][i] + "'>Send Message</button></div></div>")
						dasCounter += 1;
					}
			}
			$(".friContainer").append("<div class='friBoxButtons'><button class='friCreateGroupButton'>Create Group</button></div>")
			$(".friContainer").append("<div class='friBoxButtons2'><button class='friLogout'>Logout</button></div>")
		}else{
			$(".friContainer").append("<div class='defaultText' id='a1'>Friend List Empty</div>")
			$(".friContainer").append("<div class='friBoxButtons2l'><button class='friLogout'>Logout</button></div>")
		}
	})

	socket.on("getChatsReload", function(){
		console.log("reloadinggg")
		if (page != "friendsFGS"){
			if (page == "friends"){
				render("friendsA2")
			}else{
				render("friendsA1")
		}
			socket.emit("getChats", username)
		}else{
			socket.emit("getFriendsFGS", username, glChatId)
		}
	})

	socket.on("logoutResponse", function(){
		window.location.reload()
	})

	socket.on("removeFriendResponse", function(params){
		fAdded = false
		if (params){
			render("uProfileA2")
		}
	})

	$('body').on('click', ".gsAddMembers", function(){
		socket.emit("getFriendsFGS", username, glChatId)
	})

	$('body').on('click', '.gsSelector1', function(){
		socket.emit("removeFromGroup", $(this).prev().prev().text(), glChatId)
	})

	$('body').on('click', '.gsSelector2', function(){
		socket.emit("changeRankGroup", $(this).prev().prev().prev().text(), glChatId)
	})

	$('body').on('click', '.gsSelector3', function(){
		socket.emit("changeRankGroup", $(this).prev().prev().prev().text(), glChatId)
	})

	$('body').on('input', '.searchQuery', function(){
		if($('.searchQuery').val().length >= 2){
			if (!(searchShown)){
					render("sq")
					searchShown = true
				}
			console.log($('.searchQuery').val())
			socket.emit("searchQuery", $('.searchQuery').val(), username)
		}else if (searchShown){
			render("homeA2")
			searchShown = false
		}
	});
	$('body').on('click', '.bb', function(){
		$(".searchQuery").val("")
		render("homeA1")
		searchShown = false
	});
	$('body').on('click', '.bbc', function(){
		console.log(page)
		if (page == "userChat"){
			socket.emit("disconnectFromChat", username)
			render("friendsA1")
			socket.emit("getChats", username)
		}else if (page == "groupSettings"){
			socket.emit("connectToUser", false, glChatId, username)
		}else if(page == "friendsFGS") {
			renderGroupSettings(currUserData)
		}else{
			socket.emit("disconnectFromChat", username)
			render("friendsA1")
			socket.emit("getChats", username)
		}
	});
	$('body').on('click', '#friends', function(){
		if (!(page === "friends")){
			render("friendsA2")
			friendsFirst = true
			$(".friBoxButtons2").remove()
			socket.emit("getChats", username)
		}
	});
	$('body').on('click', '#home', function(){
		if (!(page === "home")){
			render("homeA3")
		}
	});
	$('body').on('click', '#mail', function(){
		if (!(page === "mail")){
			render("mailA1")
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
		var chid = $(this).attr("id")
		socket.emit("connectToUser", true, chid, username)
	});

	$('body').on('click', ".friButton1g", function(){
		var chid = $(this).attr("id")
		socket.emit("connectToUser", false, chid, username)
	});

	$('body').on('click', ".friButton2g", function(){
		var chid = $(this).attr("id")
		console.log(chid)
		socket.emit("removeFromGroup", username, chid)
		$(this).parent().parent().remove()
		currFriends[0].splice(currFriends[2].indexOf(chid), 1)
		currFriends[1].splice(currFriends[2].indexOf(chid), 1)
		if (currFriends[0].length == 0){
			$("center").append("<div class='defaultText' id='a1'>Friend List Empty</div>")
			$(".friBoxButtons").remove()
		}
	});

	$('body').on('click', ".friButton2", function(){
		var user = $(this).attr("id")
		$(this).parent().parent().remove()
		currFriends[0].splice(currFriends[0].indexOf(user), 1)
		currFriends[1].splice(currFriends[0].indexOf(user), 1)
		socket.emit("removeFriend", user, username, glChatId)
		if (currFriends[0].length == 0){
			$("center").append("<div class='defaultText' id='a1'>Friend List Empty</div>")
			$(".friBoxButtons").remove()
		}
	});

	$('body').on('click', '.gsLeaveGroup', function(){
		socket.emit('removeFromGroup', username, glChatId)
		render("friendsA1")
	})

	$('body').on('click', '.fgsAddMembers', function(){
		socket.emit('addMembersGroup', addToGroup, glChatId, currUserChat[0])
	})

	$("body").on('click', '.friCreateGroupButton', function(){
		socket.emit("getFriendsFNG", username)
	})

	$("body").on('click', '.gcSelector', function(){
		$(this).attr("class", 'gcSelector2')
		createGroup[0].push($(this).prev().prev().text())
		createGroup[1].push($(this).prev().text())
		console.log(createGroup)
	});

	$("body").on('click', '.gcSelector2', function(){
		createGroup[0].splice(createGroup[0].indexOf($(this).prev().prev().text()), 1)
		createGroup[1].splice(createGroup[1].indexOf($(this).prev().text()), 1)
		$(this).attr("class", 'gcSelector')
		console.log(createGroup)
	});

	$("body").on('click', '.fgsSelector', function(){
		$(this).attr("class", 'fgsSelector2')
		addToGroup[0].push($(this).prev().prev().text())
		addToGroup[1].push($(this).prev().text())
		console.log(addToGroup)
	});

	$("body").on('click', '.fgsSelector2', function(){
		addToGroup[0].splice(addToGroup[0].indexOf($(this).prev().prev().text()), 1)
		addToGroup[1].splice(addToGroup[1].indexOf($(this).prev().text()), 1)
		$(this).attr("class", 'fgsSelector')
		console.log(addToGroup)
	});


	$('body').on('submit', '.usform', function(e){
		e.preventDefault();
		glOnUser = null
		if ($(".userChatInput").val().length != 0){
			socket.emit("sendMessage", chatType, $(".userChatInput").val(), username, glChatId)
			sendTyping()
			$(".userChatInput").val("")
		}
	})
	$('body').on('keydown', '.userChatInput', function(){
		if (!(privateIsTyping)){
			privateIsTyping = true
			console.log("typingEventTrue")
			socket.emit("typingEvent", privateIsTyping, username, glChatId)
		}
			clearTimeout(privateTimer)
			privateTimer = setTimeout(sendTyping, 1000)
	})
	$('body').on('click', '.gcCreateButton', function(){
		socket.emit("createGroup", createGroup, $(".gcGroupName").val(), username)
	})

	$('body').on('click', '.friLogout', function(){
		socket.emit("logoutRequest", username)
	})

	$('body').on('click', '.userClickArea', function(){
		render("chatSettings")
	})

	$('body').on('click', '.uProfileSendMessage', function(){
		if (currUserChat != null){
			if (currUserChat[0] === curruProfile["username"]){
				socket.emit("removeFriend", curruProfile["username"], username, glChatId)
			}else{
				socket.emit("removeFriend", curruProfile["username"], username, null)
			}
		}else{
			socket.emit("removeFriend", curruProfile["username"], username, null)
		}
	})
	$('body').on('click', function(){
	})
})
