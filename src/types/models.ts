/* ---------===== custom models ====--------- */
export interface SearchResult {
  RouteNo: string
  RouteName: string
  Direction: string
  searchValue: number
  Schedules: {
    Destination: string
    ExpectedLeaveTime: string
    ExpectedCountdown: number
    ScheduleStatus: string
  }[]
}

export interface MyStop {
  stopNo: number
  title:string | null
  id: number
  profileId : number
  createdAt: string;
  updatedAt: string;
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  myFavStops: {}
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
