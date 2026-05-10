export interface Robot {

  id?: string;

  status:
    | 'MISSION'
    | 'BREAKDOWN'
    | 'ALERT'
    | 'OFFLINE';

  battery: number;

  jellyfish: number;

}