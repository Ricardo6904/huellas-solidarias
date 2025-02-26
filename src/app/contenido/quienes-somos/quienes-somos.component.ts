import { Component } from '@angular/core';

interface Sponsor {
  link: string;
  name: string;
  logo: string;
}

@Component({
    selector: 'app-quienes-somos',
    imports: [],
    templateUrl: './quienes-somos.component.html',
    styleUrl: './quienes-somos.component.scss'
})
export class QuienesSomosComponent {
  sponsors: Sponsor[] = [
    { link: 'https://linktr.ee/regalaambato',name: 'Regala Ambato', logo: 'https://scontent.fuio35-1.fna.fbcdn.net/v/t39.30808-6/450798173_824097563184479_6814943204667171092_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeECAf2L_-hsXnOStqFHCvME79zmh6yF2A7v3OaHrIXYDqL6d5a2BOlD8dyxGOSzmMcVhF_cKE67czfqbtaByiiM&_nc_ohc=9hI1JhBW6Z4Q7kNvgEqD6yi&_nc_oc=AdiBAWLC_VygSoQ16u5kZ0d2uwxP6qkL32UhhIy7fB6_Vjv6Rh9_9lFm5tWkwcfJK2fOJVsXizhZWoIt_ZF0jo36&_nc_zt=23&_nc_ht=scontent.fuio35-1.fna&_nc_gid=AnMquQt5B701YKFepz2gkYd&oh=00_AYCql5NMnEB5kaIDcCin1x9ouBErzUXzoNeoj9AVF4l3rA&oe=67C5266D' },
    { link: 'https://www.facebook.com/eonsoftwaresolutions',name: 'EON', logo: 'https://scontent.fuio35-1.fna.fbcdn.net/v/t39.30808-6/435701559_122113368794259395_1135772656652360349_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFi0PPgB-kxDr-IqtifKTQHtyRQMA6skpm3JFAwDqySmfNk_xN8EuItrNq3p0XlyYYH2tQsEFXI4oz7z7CmOeZg&_nc_ohc=pS8qI4FgUqMQ7kNvgHaPUYG&_nc_oc=Adhkze1PTdPyjHp01Z8fkoPgOKl97ooeq8XgFdPWeTsPUwliSGPeExujAGUaVwH8pLzblifomz2ks1Zf7oTT3XsS&_nc_zt=23&_nc_ht=scontent.fuio35-1.fna&_nc_gid=AYyId_eXlENNQfAnGP0pTOM&oh=00_AYAKsm7pk2LniaJDdI-O8U_MUzG343MzwMprKrcljHTV3g&oe=67C53142' },
/*     { name: 'Purina', logo: 'https://i.imgur.com/2TxdVPP.png' },
    { name: 'Hills', logo: 'https://i.imgur.com/SgXmGne.png' } */
  ];

  values: string[] = ['Compasión', 'Integridad', 'Respeto', 'Responsabilidad'];

  registerShelter() {
    console.log('Registrar refugio');
    // Implementar lógica para registrar refugio
  }
}
