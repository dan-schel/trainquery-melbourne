import { ConsoleLogger } from "corequery";
import { RelayManagerLogCategory } from "./relay-manager-log-category.js";

export class TrainqueryLogger extends ConsoleLogger {
  readonly relayManager: RelayManagerLogCategory;

  constructor() {
    super();

    const logFunc = this.log.bind(this);

    this.relayManager = new RelayManagerLogCategory(logFunc);
  }
}
