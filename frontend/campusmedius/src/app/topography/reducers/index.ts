import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromEvents from './events';
import * as fromInformation from '../../information/reducers';
import { selectRouteInfo } from '../../core/reducers';
import { Information } from '../../information/models/information';
import { getInformationEntities } from '../../information/reducers';

export interface TopographyState {
    events: fromEvents.State;
}

export interface State {
    'topography': TopographyState;
}

export const reducers = {
    events: fromEvents.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getTopographyState = createFeatureSelector<TopographyState>('topography');

// event state
/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getEventEntitiesState = createSelector(
    getTopographyState,
    state => state.events
);

export const getEventTimeFilter = createSelector(
    getEventEntitiesState,
    fromEvents.getTimeFilter
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
    selectIds: getEventIds,
    selectEntities: getEventEntities,
    selectAll: getAllEvents,
    selectTotal: getTotalEvents,
} = fromEvents.adapter.getSelectors(getEventEntitiesState);

export const getSelectedEvent = createSelector(
    getEventEntities,
    selectRouteInfo,
    (entities, routerInfo: any) => {
        const selectedId = routerInfo.params.eventId;
        if (selectedId) {
            const selectedEvent = entities[selectedId];
            return {
                current: selectedEvent,
                previous: entities[selectedEvent.previousEvent] || null,
                next: entities[selectedEvent.nextEvent] || null
            };
        } else {
            return { current: null, previous: null, next: null };
        }
    }
);

export const getFilteredEventIds = createSelector(
    getAllEvents,
    getEventTimeFilter,
    (events, timeFilter) => {
        const ids = [];
        events.forEach(event => {
            if (event.end.isAfter(timeFilter.start) && event.start.isBefore(timeFilter.end)) {
                ids.push(event.id);
            }
        });
        return ids;
    }
);


export const getEventsLoaded = createSelector(getEventEntitiesState, fromEvents.getLoaded);

export const getSelectedInformation = createSelector(
    getSelectedEvent,
    getInformationEntities,
    (selectedEvent, entities) => {
        if (selectedEvent.current) {
            const informationId = selectedEvent.current.informationId;
            return entities[informationId];
        }
        return null;
    }
);
