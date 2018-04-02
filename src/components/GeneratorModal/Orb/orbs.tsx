import alchemy from './assets/alchemy.png';
import alteration from './assets/alteration.png';
import annullment from './assets/annullment.png';
import armourers from './assets/armourers.png';
import augmentation from './assets/augmentation.png';
import blessed from './assets/blessed.png';
import chance from './assets/chance.png';
import chaos from './assets/chaos.png';
import chromatic from './assets/chromatic.png';
import divine from './assets/divine.png';
import exalted from './assets/exalted.png';
import fusing from './assets/fusing.png';
import jeweller from './assets/jeweller.png';
import regal from './assets/regal.png';
import scouring from './assets/scouring.png';
import transmute from './assets/transmutation.png';
import vaal from './assets/vaal.png';
import whetstone from './assets/whetstone.png';

export default {
  alchemy: {
    icon: alchemy,
    id: 'Metadata/Items/Currency/CurrencyUpgradeToRare'
  },
  alteration: {
    icon: alteration,
    id: 'Metadata/Items/Currency/CurrencyRerollMagic'
  },
  annullment: {
    icon: annullment,
    id: 'Metadata/Items/Currency/CurrencyRemoveMod'
  },
  armourers: {
    icon: armourers,
    id: 'Metadata/Items/Currency/CurrencyArmourQuality'
  },
  augmentation: {
    icon: augmentation,
    id: 'Metadata/Items/Currency/CurrencyAddModToMagic'
  },
  blessed: {
    icon: blessed,
    id: 'Metadata/Items/Currency/CurrencyRerollImplicit'
  },
  chaos: { icon: chaos, id: 'Metadata/Items/Currency/CurrencyRerollRare' },
  chromatic: {
    icon: chromatic,
    id: 'Metadata/Items/Currency/CurrencyRerollSocketColours'
  },
  divine: { icon: divine, id: 'Metadata/Items/Currency/CurrencyModValues' },
  exalted: {
    icon: exalted,
    id: 'Metadata/Items/Currency/CurrencyAddModToRare'
  },
  fusing: {
    icon: fusing,
    id: 'Metadata/Items/Currency/CurrencyRerollSocketLinks'
  },
  jeweller: {
    icon: jeweller,
    id: 'Metadata/Items/Currency/CurrencyRerollSocketNumbers'
  },
  regal: {
    icon: regal,
    id: 'Metadata/Items/Currency/CurrencyUpgradeMagicToRare'
  },
  scouring: {
    icon: scouring,
    id: 'Metadata/Items/Currency/CurrencyConvertToNormal'
  },
  transmute: {
    icon: transmute,
    id: 'Metadata/Items/Currency/CurrencyUpgradeToMagic'
  },
  vaal: { icon: vaal, id: 'Metadata/Items/Currency/CurrencyCorrupt' },
  whetstone: {
    icon: whetstone,
    id: 'Metadata/Items/Currency/CurrencyWeaponQuality'
  }
} as { [key: string]: { icon: string; id: string } };
