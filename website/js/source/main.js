/*global io*/

require(['plugins/log', 'jquery', 'monome', 'socket.io'], function (log, $, monome) {

	var main = {

		monome: monome,

		location: {},

		init: function () {

			var self = this;

			self.monome.init(self);

			self.bindEvents();

			self.socketConnect();

			console.log('Main initiated: ', self);

		},

		bindEvents: function () {

			var self = this;

			var currentLocation;

			$(window).on('keypress', function (e) {

				if (e.keyCode === 32) {

					e.preventDefault();

					self.monome.clear();

				}

			});

			$(".location").click(function () {

				self.location.name = $(this).attr("id");

				self.registerSocket();

				$("#splash").addClass("hidden");

				// $("#loader").removeClass("hidden").addClass(self.location.name);

				$('#monome').removeClass('hidden');

				console.log("Current location: ", self.location.name);

			});

		},

		socketConnect: function () {

			var self = this;

			self.socket = io.connect('//' + location.hostname + ':8080');

			self.bindSocketEvents();

		},

		bindSocketEvents: function () {

			var self = this;

			self.socket.on('message', function (data) {

				console.log('Message: ', data.message);

			});

			self.socket.on('press', function (data) {

				console.log('Press received from: ', data.location.name, data.key.id);

			});

		},

		registerSocket: function () {

			var self = this;

			self.socket.emit('register', self.location);

		}

	};

	$(document).ready(function () {

		main.init();

	});

});