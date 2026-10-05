# Kıyanç İnşaat — statik site

HTML, CSS ve vanilla JavaScript. Derleme, npm, WordPress, PHP, veritabanı veya çalışma zamanı bağımlılığı gerekmez.

## İçerik ve tasarım

Mevcut sitenin logosu, sarı/antrasit renkleri, dört ana sayfa görseli, kurumsal metinleri, referansları ve sekiz projenin fotoğrafları korunmuştur. Ana sayfa, dört menü sayfası, üç tanıtım sayfası ve sekiz proje detayı: toplam 16 içerik sayfası. Eski URL yolları korunur. `404.html` ayrıca eklenmiştir.

Sayfa düzeni ve boşluklar sadeleştirilmiştir. Mobil menü, elle ilerletilen görsel bandı, proje filtreleri ve klavyeyle kapatılabilen fotoğraf penceresi bulunur. JavaScript kapalıyken sayfalar, tüm projeler, açık mobil menü ve fotoğraf bağlantıları çalışır. İletişim formu kaldırılmıştır. Telefon, e-posta ve harita bağlantıları kullanılabilir.

Tüm 293 görsel `assets/images/` içindedir. Google Fonts, jQuery, WordPress eklentileri, Google Maps API ve CDN bağımlılığı yoktur. Proje kategorileri kaynak sitedeki haliyle alınmıştır; yayın öncesi “Devam Eden” etiketlerinin güncelliğini kontrol edin.

## Yerel önizleme

Bu klasörde:

```sh
python3 -m http.server 8000
```

Tarayıcıda `http://localhost:8000` adresini açın. Doğrudan dosya açmak yerine HTTP üzerinden önizleme yapın.

## GitHub Pages yayını

1. GitHub'da kullanılacak depoyu oluşturun veya mevcut depoyu açın.
2. Bu klasörün **içeriğini** depo köküne koyun. `index.html`, `assets/`, `.nojekyll` ve `.github/workflows/pages.yml` kökte olmalı. ZIP dosyasını veya dış `kiyanc-static` klasörünü depo köküne koymayın. Gizli `.github` klasörünü de yükleyin.
3. Varsayılan dalı `main` olarak kullanın; başka bir dal kullanacaksanız `pages.yml` içindeki `branches` değerini değiştirin.
4. **Settings → Pages → Build and deployment → Source → GitHub Actions** seçin.
5. `main` dalına gönderin veya Actions ekranında “Publish static site to GitHub Pages” iş akışını elle çalıştırın.
6. Actions başarıyla tamamlandığında Pages ekranındaki yayın adresini açın.

Göreli dosya bağlantıları hem `https://KULLANICI.github.io/DEPO/` altında hem özel alan adında çalışır.

Resmi yönerge: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## kiyancinsaat.com.tr alan adını bağlama

Önce GitHub Pages adresinde siteyi kontrol edin. Sonra Settings → Pages → Custom domain alanında `kiyancinsaat.com.tr` tanımlayın. Alan adı yapılandırması, GitHub Pages yayını doğrulandıktan sonra yapılmalı; bu pakette bilerek `CNAME` bulunmuyor.

DNS kayıtlarını GitHub'ın güncel belgesine göre ayarlayın; `www` için CNAME hedefi `KULLANICI.github.io` olur (depo yolu eklenmez). Sertifika oluşunca Enforce HTTPS seçeneğini etkinleştirin. Alan adının GitHub hesabında doğrulanması önerilir.

Resmi yönerge: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Mevcut e-posta hizmetinin MX/TXT kayıtlarını koruyun; statik site taşıması e-posta sunucusunu taşımaz.

## Düzenleme

- Sayfa içerikleri: ilgili klasördeki `index.html`.
- Ortak stiller: `assets/style.css`.
- Etkileşimler: `assets/site.js`.
- Görseller: `assets/images/`.
- Menü, üst bilgi ve alt bilgi her sayfada ayrı HTML olarak bulunur. Ortak bilgiyi değiştirirken tüm sayfalarda güncelleyin.

## Doğrulama durumu

Tüm yerel bağlantılar ve görsel dosyaları kontrol edildi. JavaScript sözdizimi kontrolü geçti. WordPress kodu ve iletişim formu bulunmuyor. Bu çalışma ortamında tarayıcı başlatılamadığından gerçek tarayıcıda görsel doğrulama tamamlanmadı. Yayın öncesi masaüstü ve mobil görünümü, menüyü, filtreleri, galeri penceresini ve iletişim bağlantılarını kontrol edin.

Kaynak içerik 5 Ekim 2026 tarihinde https://www.kiyancinsaat.com.tr/ üzerinden alındı. GitHub deposu: https://github.com/mtahca/kiyancinsaat

GitHub Pages yayın hedefi: https://mtahca.github.io/kiyancinsaat/
