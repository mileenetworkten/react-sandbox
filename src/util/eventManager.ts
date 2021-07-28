interface EventObject {
  event: (...args: any[]) => any;
  callback?: (...args: any[]) => any;
}

interface EventMap {
  [key: string]: EventObject[];
}

// let registeredEvents: EventMap = {};

export class EventManager {
  registeredEvents: EventMap = {};
  constructor() {
    console.log('EventManager constructed');
    console.log('EventManager constructed:: ', { eventmapkeys: [...Object.keys(this.registeredEvents)] });
  }
  /**
   * Calling this will force all callbacks listening to the eventId to fire
   * along with any arguments you've specified in both the addEventListener event and this one
   * @param {Events} eventId an enum string which triggers all callbacks listening to the id
   * @param {...any} args optional arguments that are added to the callback arguments
   */
  emit = (eventId: string, ...args: any[]) => {
    const eventList = this.registeredEvents[eventId];
    if (eventList !== undefined) {
      for (let i = 0; i < eventList.length; ++i) {
        eventList[i].event(...args);
      }
    }
  };

  /**
   * Add an event listener to dispatch from anywhere within the application
   * Adding the same callback to an event registered before will replace it with the latest
   * @param {Events} eventId an enum string which triggers the callback
   * @param {function} callback function that is called when the event id is dispatched
   * @param {...any} args additional optional arguments to pass to the callback
   */
  add = (eventId: string, callback: (...args: any[]) => any, ...args: any[]) => {
    console.log('EventManager add:: ', { eventId, eventmapkeys: [...Object.keys(this.registeredEvents)] });
    if (this.registeredEvents[eventId] === undefined) {
      this.registeredEvents[eventId] = [];
      console.log('eventId:' + eventId + ' was not defined so creating an empty list');
    } else {
      console.log('registered event already has this event: ' + eventId);
      console.log({ registeredEventsLen: this.registeredEvents[eventId].length });
    }
    const list = this.registeredEvents[eventId];
    const index = list.findIndex((ref: EventObject) => ref.callback === callback);
    console.log('findIndex: ' + index);
    const targetIndex = index > -1 ? index : list.length;
    console.log('targetIndex: ' + targetIndex);
    list[targetIndex] = {
      event: function (...wrappedArgument: any[]) {
        callback(...args, ...wrappedArgument);
      },
      //stored for reference removal in remove
      callback,
    };
  };

  /**
   * Remove a callback from listening to a particular event id
   * @param {Events} eventId an enum string which triggers the callback
   * @param {function} callback function that is called when the event id is dispatched
   */
  remove = (eventId: string, callback: Function) => {
    const eventList = this.registeredEvents[eventId];
    if (eventList !== undefined) {
      for (let i = eventList.length - 1; i >= 0; --i) {
        if (callback === eventList[i].callback) {
          eventList.splice(i, 1);
          break;
        }
      }
      if (eventList.length === 0) {
        delete this.registeredEvents[eventId];
      }
    }
  };

  dispose = () => {
    for (const eventId in this.registeredEvents) {
      this.registeredEvents[eventId] = null;
    }
    this.registeredEvents = {};
  };

  printEvents = (id: string) => {
    console.log('printEvents::', { id, registeredEvents: this.registeredEvents });
  };

  getEventMap = () => this.registeredEvents;
}
