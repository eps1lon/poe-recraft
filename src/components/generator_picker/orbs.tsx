import alchemy from './assets/alchemy.png';
import alteration from './assets/alteration.png';
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
  alchemy: { icon: alchemy, primary: 5 },
  alteration: { icon: alteration, primary: 9 },
  armourers: { icon: armourers, primary: 3 },
  augmentation: { icon: augmentation, primary: 13 },
  blessed: { icon: blessed, primary: 21 },
  chaos: { icon: chaos, primary: 2 },
  chromatic: { icon: chromatic, primary: 17 },
  divine: { icon: divine, primary: 20 },
  exalted: { icon: exalted, primary: 11 },
  fusing: { icon: fusing, primary: 18 },
  jeweller: { icon: jeweller, primary: 19 },
  regal: { icon: regal, primary: 12 },
  scouring: { icon: scouring, primary: 10 },
  transmute: { icon: transmute, primary: 8 },
  vaal: { icon: vaal, primary: 30 },
  whetstone: { icon: whetstone, primary: 0 }
} as { [key: string]: { icon: string; primary: number } };
