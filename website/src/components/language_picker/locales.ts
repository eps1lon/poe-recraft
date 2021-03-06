import cn from './cn.svg';
import de from './de.svg';
import en from './en.svg';
import es from './es.svg';
import fr from './fr.svg';
import pt from './pt.svg';
import ru from './ru.svg';
import th from './th.svg';
import tw from './tw.svg';

export default {
  de: { name: 'Deutsch', icon: de },
  en: { name: 'english', icon: en },
  es: { name: 'español', icon: es },
  fr: { name: 'français', icon: fr },
  pt: { name: 'português', icon: pt },
  ru: { name: 'ру́сский язы́к', icon: ru },
  th: { name: 'ภาษาไทย', icon: th },
  'zh-tw': { name: '汉语', icon: tw }, // traditional
  'zh-cn': { name: '漢語', icon: cn }, // simplified
} as {
  [key: string]: {
    name: string;
    icon: string;
  };
};
