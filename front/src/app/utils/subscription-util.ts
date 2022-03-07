import {Subscription} from "rxjs";

export function cleanSubscription(sub: Subscription | undefined | null) {
  if (sub && !sub.closed) {
    sub.unsubscribe()
  }
  return null
}
