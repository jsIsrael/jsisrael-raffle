'use strict';

import AddCtrl from './add/add.ctrl';
import RaffleCtrl from './raffle/raffle.ctrl';
import RaffleService from './services/raffle.srv';

angular.module('jsisraelRaffle', ['ngAnimate', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .controller('AddCtrl', AddCtrl)
  .controller('RaffleCtrl', RaffleCtrl)
  .service('RaffleService', RaffleService)

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/add/add.tpl.html',
        controller: 'AddCtrl',
        controllerAs: 'vm'
      })
      .when('/raffle', {
        templateUrl: 'app/raffle/raffle.tpl.html',
        controller: 'RaffleCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
