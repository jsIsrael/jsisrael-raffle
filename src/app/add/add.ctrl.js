'use strict';

import _ from '../../../bower_components/lodash/lodash';


class AddCtrl {

  constructor (RaffleService) {
    this.RaffleService = RaffleService;
  }

  addPeople(){
    if (this.peopleInput){
      var peopleText = this.peopleInput;
      var namesList = peopleText.replace(/\r\n/g, "\n").split("\n");

      var uniqueNames = _.uniq(namesList);
      var raffleNames = this.RaffleService.raffleNames;

      if (raffleNames && raffleNames.length > 0 ){
        uniqueNames = raffleNames.concat(uniqueNames);
        uniqueNames = _.uniq(uniqueNames);
      }
      this.RaffleService.raffleNames = uniqueNames;
      this.peopleInput = "";
    }
  }

  removeDude(index){
    this.RaffleService.raffleNames.splice(index,1);
  }
}

AddCtrl.$inject = ['RaffleService'];

export default AddCtrl;
