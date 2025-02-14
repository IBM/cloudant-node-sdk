/**
 * © Copyright IBM Corporation 2025. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { PageIterator } from './pageIterator';
import { Pager } from './pager';

export class IteratorPager<I> implements Pager<I> {
  private pageIterableIterator: PageIterator<I>;
  private state: State = State.NEW;

  constructor(pageIterableIterator: PageIterator<I>) {
    this.pageIterableIterator = pageIterableIterator;
  }

  hasNext(): boolean {
    return this.pageIterableIterator.hasNext();
  }

  async getNext(): Promise<ReadonlyArray<I>> {
    this.checkState(State.GET_NEXT);
    const nextElement = await this.pageIterableIterator.next();
    if (!this.hasNext()) {
      this.state = State.CONSUMED;
    }
    if (nextElement.done) {
      throw new Error('No more results available.');
    }
    return nextElement.value;
  }

  async getAll(): Promise<ReadonlyArray<I>> {
    this.checkState(State.GET_ALL);
    let items: Array<I> = [];
    for await (const page of this.pageIterableIterator) {
      items.push(...page);
    }
    // If it didn't throw we can set the consumed state
    this.state = State.CONSUMED;
    const readOnlyItems: ReadonlyArray<I> = [...items];
    return readOnlyItems;
  }

  private checkState(state: State) {
    if (this.state === state) {
      return;
    }
    switch (this.state) {
      case State.NEW:
        this.state = state;
        break;
      case State.CONSUMED:
        throw new Error('This pager has been consumed, use a new Pager.');
      default:
        throw new Error(
          'Cannot mix getAll() and getNext(), use only one method or get a a new Pager.'
        );
    }
  }
}

export enum State {
  NEW,
  GET_NEXT,
  GET_ALL,
  CONSUMED,
}
