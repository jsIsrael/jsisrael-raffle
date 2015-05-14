var length,
  speed,
  numOfSpeedChanges,
  interval,
  level,
  timeSoFar,
  selectedIndex,
  $scope,
  $timeout;


class RaffleCtrl {

  constructor(_$scope, RaffleService, _$timeout) {
    this.RaffleService = RaffleService;
    $scope = _$scope;
    $timeout = _$timeout;
  }

  startRaffle() {
    if (this.RaffleService.raffleNames && this.RaffleService.raffleNames.length > 0) {
      length = 12000;
      speed = 10;
      numOfSpeedChanges = 4;
      interval = length / numOfSpeedChanges;
      level = 1;
      timeSoFar = 0;
      selectedIndex = 0;

      this.controlTimer();
    }
  }

  controlTimer() {

    if (timeSoFar > (level * interval)) {
      level++;
      speed = speed * level;
    }

    if (level <= numOfSpeedChanges) {
      timeSoFar += speed;
      this.waitAndChangeName(speed);
    } else {
      //$scope.$apply( () => {
        this.RaffleService.winners.push(this.selectedName);

        this.RaffleService.raffleNames.splice(selectedIndex, 1);
      //})

    }
  }

  waitAndChangeName(timeToWait) {
    $timeout(() => {
      var randLength = this.RaffleService.raffleNames.length - 1;
      selectedIndex = _.random(0, randLength);
      this.selectedName = this.RaffleService.raffleNames[selectedIndex];
      this.controlTimer();
    }, timeToWait);
  }

}

RaffleCtrl.$inject = ['$scope','RaffleService', '$timeout'];

export default RaffleCtrl;
