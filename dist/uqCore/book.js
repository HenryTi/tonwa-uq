import { UqQuery } from './query';
import { QueryQueryCaller } from './caller';
export class UqBook extends UqQuery {
    get typeName() { return 'book'; }
    queryApiName = 'book';
    queryCaller(params) {
        return new BookQueryCaller(this, params);
    }
}
export class Book extends UqBook {
}
export class BookQueryCaller extends QueryQueryCaller {
    get path() { return `book/${this.entity.name}`; }
}
//# sourceMappingURL=book.js.map