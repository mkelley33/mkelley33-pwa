import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
/**
 * Singleton class wrapping the Next Router
 */
export class NextRouterWrapper {
  private static instance: NextRouterWrapper;
  private appRouterInstance: AppRouterInstance;

  private constructor() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    this.appRouterInstance = useRouter();
  }

  /**
   *
   * @returns Next App Router Instance
   */
  public static getAppRouter(): AppRouterInstance {
    if (!NextRouterWrapper.instance) {
      NextRouterWrapper.instance = new this();
    }
    return NextRouterWrapper.instance.appRouterInstance;
  }
}
