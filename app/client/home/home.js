"use strict";
angular.module('starter.home', [])

	.controller('HomeCtrl', function($ionicPlatform, $scope, $state, localStorageService, Messages ) {
		$scope.shouldShowDelete = false;
		$scope.shouldShowReorder = false;
		$scope.listCanSwipe = true;

		$scope.lonConfig = {};
		$scope.lonConfig.isEnabled = localStorageService.get('lonConfig.isEnabled') === 'true' ? true : false;
		$scope.lonConfig.savedContacts = localStorageService.get('lonConfig.savedContacts') || [];
		$scope.lonConfig.threshold = parseInt(localStorageService.get('lonConfig.threshold')) || 15;
		$scope.lonConfig.message = localStorageService.get('lonConfig.message');
		$scope.lonConfig.messages = localStorageService.get('lonConfig.messages');

		//if ($scope.lonConfig.message === null || $scope.lonConfig.message === 'null') {
		//	$scope.lonConfig.message = 'My Battery is Dying.. TTYL.';
		//}
		//We register watch on the config options and ask the  localStorageService to update
		// the local storage when there are changes to these values.
		// will need
		localStorageService.bind($scope, 'lonConfig.isEnabled', $scope.lonConfig.isEnabled);
		localStorageService.bind($scope, 'lonConfig.threshold', $scope.lonConfig.threshold);
		localStorageService.bind($scope, 'lonConfig.message', $scope.lonConfig.message);
		localStorageService.bind($scope, 'lonConfig.messages', $scope.lonConfig.messages);
		localStorageService.bind($scope, 'lonConfig.savedContacts', $scope.lonConfig.savedContacts);

		$scope.allMessages = Messages.messages();

		//$scope.sendAll = function(){
		//	//$scope.sendAllSMS();
		//	$scope.$emit('initSend');
		//
		//};

		$scope.toContacts = function() {
			$state.go('contacts');
		};

		$scope.edit = function(index) {
			$state.go('contacts');
		};

		$ionicPlatform.ready(function() {
			//$scope.onBatteryStatus = function(info) {
			//
			//	$scope.lonConfig.level = info.level;
			//	$scope.lonConfig.isPlugged = info.isPlugged;
			//
			//	if (info.isPlugged) {
			//		localStorageService.set('lonConfig.lastSentBattery', null);
			//	}
			//
			//	if ($scope.lonConfig.isEnabled && !info.isPlugged && info.level <= parseInt(localStorageService.get('lonConfig.threshold'))) {
			//		$scope.sendSMS(info);
			//
			//	}

				//$scope.$apply();

			//};

			//window.addEventListener('batterystatus', $scope.onBatteryStatus, false);

			window.addEventListener('initSend', $scope.sendAllSMS, false);


			//$scope.sendSMS = function(info) {
			//
			//	var lastSentBattery = localStorageService.get('lonConfig.lastSentBattery');
			//
			//	lastSentBattery = lastSentBattery === 'null' ? null : lastSentBattery;
			//
			//	function _sms(number) {
			//		var msg = localStorageService.get('lonConfig.message');
			//
			//		var message = msg !== 'null' ? msg : 'My Battery is Dying.. TTYL.';
			//		var intent = ''; //leave empty for sending sms using default intent
			//		var success = function() {
			//			alert('Message sent successfully');
			//		};
			//		var error = function() {
			//			alert('Message Failed:' + e);
			//		};
			//		sms.send(number, message, intent, success, error);
			//	}
			//
			//	if ((lastSentBattery === null) || parseInt(lastSentBattery) < info.level) {
			//		var savedContacts = localStorageService.get('lonConfig.savedContacts');
			//		savedContacts = savedContacts ? savedContacts : [];
			//		var _u = [];
			//
			//		for (var i = 0; i < savedContacts.length; i++) {
			//			_u.push(savedContacts[i].name);
			//			_sms(savedContacts[i].number);
			//		}
			//
			//		if (_u.length > 0) {
			//			window.plugin.notification.local.add({
			//				autoCancel: true,
			//				message: 'Battery Notification Message sent to : ' + _u.join(', ')
			//			});
			//		}
			//		localStorageService.set('lonConfig.lastSentBattery', info.level);
			//	}
			//};
			$scope.sendAll = function() {
				//var number = document.getElementById('numberTxt').value;
				//var message = document.getElementById('messageTxt').value;
				//alert(number);
				//alert(message);

				//CONFIGURATION
				var options = {
					replaceLineBreaks: false, // true to replace \n by a new line, false by default
					android: {
						intent: ''  // send SMS with the native android SMS messaging
						//intent: '' // send SMS without open any other app
					}
				};

				var success = function () { alert('Message sent successfully'); };
				var error = function (e) { alert('Message Failed:' + e); };
				var _u = [];

				for (var i = 0; i < $scope.allMessages.messages.length; i++) {
					_u.push($scope.allMessages.messages[i].contactPhone);
					sms.send($scope.allMessages.messages[i].contactPhone,
						$scope.allMessages.messages[i].text, options, success, error);
					//_sms($scope.allMessages.messages[i]);
				}

				if (_u.length > 0) {

				}
			};

			$scope.sendAllSMS = function() {

				//var lastSentBattery = localStorageService.get('lonConfig.lastSentBattery');

				//lastSentBattery = lastSentBattery === 'null' ? null : lastSentBattery;

				function _sms(correspond) {
					var msg = correspond.text;

					var message = msg !== 'null' ? msg : 'Yo';
					var intent = ''; //leave empty for sending sms using default intent
					var success = function() {
						console.log('Message sent successfully' + message +', '+ correspond.contactPhone );
					};
					var error = function() {
						console.log('Message Failed:' + e);
					};
					//sms.send(number, message, intent, success, error);
					//$cordovaSms
					//	.send(correspond.contactPhone, message)
					//	.then(function() {
					//		// Success! SMS was sent
					//		console.log("success sms sent");
					//	}, function(error) {
					//		// An error occurred
					//		console.log("error", error)
					//	});
				}

				//if ((lastSentBattery === null) || parseInt(lastSentBattery) < info.level) {
				//	var savedContacts = localStorageService.get('lonConfig.savedContacts');
				//	savedContacts = savedContacts ? savedContacts : [];
					var _u = [];

					for (var i = 0; i < $scope.allMessages.messages.length; i++) {
						_u.push($scope.allMessages.messages[i].contactPhone);
						_sms($scope.allMessages.messages[i]);
					}

					if (_u.length > 0) {
						//window.plugin.notification.local.add({
						//	autoCancel: true,
						//	message: 'Messages sent to : ' + _u.join(', ')
						//});
					}
				//	localStorageService.set('lonConfig.lastSentBattery', info.level);
				//}
			};

		});

	});
