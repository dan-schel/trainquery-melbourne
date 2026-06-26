// TODO: Move to corequery.

export class CoreDayOfWeek {
  static readonly SUNDAY = new CoreDayOfWeek(0);
  static readonly MONDAY = new CoreDayOfWeek(1);
  static readonly TUESDAY = new CoreDayOfWeek(2);
  static readonly WEDNESDAY = new CoreDayOfWeek(3);
  static readonly THURSDAY = new CoreDayOfWeek(4);
  static readonly FRIDAY = new CoreDayOfWeek(5);
  static readonly SATURDAY = new CoreDayOfWeek(6);

  private constructor(readonly index: number) {}

  isEqual(other: CoreDayOfWeek): boolean {
    return this.index === other.index;
  }

  static fromDate(year: number, month: number, day: number): CoreDayOfWeek {
    return new CoreDayOfWeek(new Date(year, month - 1, day).getDay());
  }

  isSunday(): boolean {
    return this.isEqual(CoreDayOfWeek.SUNDAY);
  }
  isMonday(): boolean {
    return this.isEqual(CoreDayOfWeek.MONDAY);
  }
  isTuesday(): boolean {
    return this.isEqual(CoreDayOfWeek.TUESDAY);
  }
  isWednesday(): boolean {
    return this.isEqual(CoreDayOfWeek.WEDNESDAY);
  }
  isThursday(): boolean {
    return this.isEqual(CoreDayOfWeek.THURSDAY);
  }
  isFriday(): boolean {
    return this.isEqual(CoreDayOfWeek.FRIDAY);
  }
  isSaturday(): boolean {
    return this.isEqual(CoreDayOfWeek.SATURDAY);
  }
}
