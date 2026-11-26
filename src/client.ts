import {
  createFetchClient,
  AVCICMS_CLIENT_HEADER,
  AVCICMS_API_KEY_HEADER,
  CONTENT_LANGUAGE_HEADER,
  type AvciCMSConfig,
  type AvciFetchClient,
} from './core/fetchClient';
import { ContentModule } from './modules/content';
import { WorkspaceModule } from './modules/workspace';
import { ShipmentModule } from './modules/shipment';
import { AttributeModule } from './modules/attribute';
import { CustomFormModule } from './modules/customForm';
import { BasketModule } from './modules/basket';
import { OrderModule } from './modules/order';
import { UserModule } from './modules/user';
import { MerchantModule } from './modules/merchant';
import { BrandModule } from './modules/brand';
import { OrganizationModule } from './modules/organization';
import { StaticModule } from './modules/static';
import { TeamModule } from './modules/team';
import { PlaceModule } from './modules/place';
import { TermsModule } from './modules/terms';

export { AVCICMS_CLIENT_HEADER, AVCICMS_API_KEY_HEADER, CONTENT_LANGUAGE_HEADER };
export type { AvciCMSConfig };
export * from './modules/shipment';
export * from './modules/attribute';
export * from './modules/customForm';
export * from './modules/basket';
export * from './modules/order';
export * from './modules/user';
export * from './modules/merchant';
export * from './modules/brand';
export * from './modules/organization';
export * from './modules/static';
export * from './modules/team';
export * from './modules/place';
export * from './modules/terms';
export * from './types/attribute';
export * from './types/customForm';
export * from './types/basket';
export * from './types/order';
export * from './types/user';
export * from './types/merchant';
export * from './types/brand';
export * from './types/organization';
export * from './types/static';
export * from './types/team';
export * from './types/place';
export * from './types/terms';
export * from './cache';

export class AvciCMS {
  private readonly client: AvciFetchClient;

  public readonly content: ContentModule;
  public readonly workspace: WorkspaceModule;
  public readonly shipment: ShipmentModule;
  public readonly attribute: AttributeModule;
  public readonly customForm: CustomFormModule;
  public readonly basket: BasketModule;
  public readonly order: OrderModule;
  public readonly user: UserModule;
  public readonly merchant: MerchantModule;
  public readonly brand: BrandModule;
  public readonly organization: OrganizationModule;
  public readonly static: StaticModule;
  public readonly team: TeamModule;
  public readonly place: PlaceModule;
  public readonly terms: TermsModule;

  constructor(config: AvciCMSConfig) {
    this.client = createFetchClient(config);

    // Initialize modules
    this.content = new ContentModule(this.client);
    this.workspace = new WorkspaceModule(this.client);
    this.shipment = new ShipmentModule(this.client);
    this.attribute = new AttributeModule(this.client);
    this.customForm = new CustomFormModule(this.client);
    this.basket = new BasketModule(this.client);
    this.order = new OrderModule(this.client);
    this.user = new UserModule(this.client);
    this.merchant = new MerchantModule(this.client);
    this.brand = new BrandModule(this.client);
    this.organization = new OrganizationModule(this.client);
    this.static = new StaticModule(this.client);
    this.team = new TeamModule(this.client);
    this.place = new PlaceModule(this.client);
    this.terms = new TermsModule(this.client);
  }
}
