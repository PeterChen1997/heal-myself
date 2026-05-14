import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const promptSource = readFileSync(resolve(root, 'src/data/imagePrompts.ts'), 'utf8')
const outputDir = resolve(root, 'src/assets/generated')
const tempDir = resolve(root, '.asset-tmp')

mkdirSync(outputDir, { recursive: true })
mkdirSync(tempDir, { recursive: true })

const fileNames = [...promptSource.matchAll(/fileName: '([^']+)'/g)].map((match) => match[1])

const palettes = [
  ['#e4f2eb', '#3e8f73', '#9bd4bd', '#fff2d6'],
  ['#e4eef9', '#4e8fd8', '#a7c8ec', '#fae5df'],
  ['#fff2d6', '#f2b84b', '#ffd98b', '#e4f2eb'],
  ['#eee9f7', '#8d7cc4', '#c9bfe9', '#e4eef9']
]

function hash(value) {
  return [...value].reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

function motifSvg(motif, palette, fileName) {
  const isLifestyle = fileName.includes('lifestyle')
  const accent = palette[1]
  const soft = palette[2]
  const warm = palette[3]

  if (motif === 'hero') {
    return `
      <circle cx="600" cy="325" r="92" fill="#ffe8ca"/>
      <rect x="526" y="420" width="148" height="190" rx="74" fill="${soft}"/>
      <circle cx="566" cy="320" r="16" fill="${accent}"/>
      <circle cx="634" cy="320" r="16" fill="${accent}" opacity="0.72"/>
      <path d="M552 374 C578 398, 626 398, 652 374" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round" opacity="0.5"/>
      <rect x="280" y="230" width="190" height="120" rx="42" fill="#ffffff" opacity="0.82"/>
      <rect x="730" y="250" width="190" height="120" rx="42" fill="#ffffff" opacity="0.82"/>
      <rect x="760" y="536" width="210" height="120" rx="42" fill="#ffffff" opacity="0.82"/>
      <circle cx="374" cy="290" r="32" fill="${warm}"/>
      <circle cx="826" cy="310" r="32" fill="${accent}" opacity="0.42"/>
      <path d="M812 600 C862 556, 910 556, 948 600" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.38"/>`
  }

  if (isLifestyle) {
    if (motif === 'eyes') {
      return `
        <rect x="332" y="454" width="328" height="206" rx="34" fill="#ffffff" opacity="0.9"/>
        <rect x="370" y="494" width="252" height="118" rx="18" fill="${soft}" opacity="0.9"/>
        <circle cx="770" cy="382" r="72" fill="#ffe8ca"/>
        <path d="M700 376 C734 332, 806 332, 840 376 C806 430, 734 430, 700 376Z" fill="#ffffff"/>
        <circle cx="770" cy="378" r="26" fill="${accent}" opacity="0.72"/>
        <path d="M698 538 C750 498, 822 498, 870 538" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.36"/>
        <path d="M836 256 L900 214 M864 304 L936 292" stroke="${warm}" stroke-width="18" stroke-linecap="round" opacity="0.74"/>
        <circle cx="454" cy="350" r="38" fill="${accent}" opacity="0.18"/>
        <path d="M426 350 H482 M454 322 V378" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.42"/>`
    }

    if (motif === 'oral') {
      return `
        <rect x="336" y="270" width="270" height="330" rx="42" fill="#ffffff" opacity="0.9"/>
        <circle cx="470" cy="390" r="86" fill="#ffe8ca"/>
        <path d="M396 414 C434 460, 506 460, 544 414" fill="none" stroke="#d95c4a" stroke-width="18" stroke-linecap="round" opacity="0.38"/>
        <path d="M694 286 L872 236" stroke="${accent}" stroke-width="22" stroke-linecap="round" opacity="0.42"/>
        <path d="M704 350 L892 322" stroke="${accent}" stroke-width="16" stroke-linecap="round" opacity="0.32"/>
        <rect x="690" y="424" width="210" height="78" rx="30" fill="${soft}" opacity="0.9"/>
        <path d="M710 554 C770 510, 826 510, 884 554" fill="none" stroke="${warm}" stroke-width="18" stroke-linecap="round" opacity="0.84"/>
        <circle cx="618" cy="640" r="30" fill="${accent}" opacity="0.2"/>`
    }

    if (motif === 'nose') {
      return `
        <rect x="318" y="334" width="260" height="220" rx="42" fill="#ffffff" opacity="0.86"/>
        <path d="M458 390 C414 446, 424 518, 490 536 C540 548, 588 520, 582 470 C576 430, 526 426, 512 394" fill="#ffe8ca"/>
        <path d="M640 292 C730 248, 830 262, 898 326" fill="none" stroke="${accent}" stroke-width="20" stroke-linecap="round" opacity="0.32"/>
        <circle cx="704" cy="422" r="24" fill="${warm}" opacity="0.82"/>
        <circle cx="790" cy="384" r="18" fill="${warm}" opacity="0.66"/>
        <circle cx="856" cy="470" r="22" fill="${warm}" opacity="0.58"/>
        <rect x="650" y="560" width="260" height="76" rx="30" fill="#ffffff" opacity="0.78"/>
        <path d="M682 598 H878" stroke="${soft}" stroke-width="18" stroke-linecap="round"/>`
    }

    if (motif === 'scalp') {
      return `
        <rect x="334" y="282" width="236" height="292" rx="44" fill="#ffffff" opacity="0.88"/>
        <circle cx="452" cy="400" r="82" fill="#ffe8ca"/>
        <path d="M376 376 C388 292, 516 292, 528 376 C480 338, 424 338, 376 376Z" fill="${accent}" opacity="0.48"/>
        <path d="M640 268 C724 336, 814 334, 900 268" fill="none" stroke="${soft}" stroke-width="24" stroke-linecap="round"/>
        <path d="M650 372 C732 428, 808 428, 888 372" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <circle cx="680" cy="602" r="22" fill="${warm}" opacity="0.76"/>
        <circle cx="760" cy="620" r="16" fill="${warm}" opacity="0.62"/>
        <circle cx="842" cy="596" r="20" fill="${warm}" opacity="0.54"/>`
    }

    if (motif === 'neck') {
      return `
        <rect x="324" y="318" width="282" height="236" rx="42" fill="#ffffff" opacity="0.86"/>
        <rect x="360" y="362" width="210" height="120" rx="18" fill="${soft}" opacity="0.9"/>
        <circle cx="748" cy="322" r="68" fill="#ffe8ca"/>
        <rect x="704" y="390" width="88" height="160" rx="42" fill="#ffe8ca"/>
        <path d="M752 416 C710 486, 722 560, 792 618" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round" opacity="0.34"/>
        <path d="M354 602 C486 654, 626 654, 758 602" fill="none" stroke="${warm}" stroke-width="22" stroke-linecap="round" opacity="0.78"/>
        <path d="M646 342 L674 342" stroke="${accent}" stroke-width="16" stroke-linecap="round" opacity="0.42"/>`
    }

    if (motif === 'thyroid') {
      return `
        <rect x="330" y="300" width="236" height="300" rx="44" fill="#ffffff" opacity="0.86"/>
        <circle cx="448" cy="404" r="74" fill="#ffe8ca"/>
        <rect x="412" y="470" width="72" height="104" rx="34" fill="#ffe8ca"/>
        <path d="M658 336 C730 298, 820 314, 872 382" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <path d="M656 472 C706 432, 748 494, 704 548 C664 596, 624 536, 656 472Z" fill="${accent}" opacity="0.26"/>
        <path d="M814 472 C764 432, 722 494, 766 548 C806 596, 846 536, 814 472Z" fill="${accent}" opacity="0.26"/>
        <circle cx="638" cy="628" r="22" fill="${warm}" opacity="0.72"/>
        <circle cx="820" cy="628" r="22" fill="${warm}" opacity="0.58"/>`
    }

    if (motif === 'gut') {
      return `
        <rect x="318" y="310" width="250" height="230" rx="42" fill="#ffffff" opacity="0.86"/>
        <circle cx="404" cy="398" r="42" fill="${warm}" opacity="0.84"/>
        <circle cx="482" cy="406" r="36" fill="${accent}" opacity="0.24"/>
        <path d="M636 298 C720 344, 814 344, 898 298" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <path d="M642 404 C724 360, 824 370, 884 444" fill="none" stroke="${soft}" stroke-width="22" stroke-linecap="round"/>
        <rect x="648" y="538" width="236" height="86" rx="30" fill="#ffffff" opacity="0.78"/>
        <path d="M678 582 H846" stroke="${warm}" stroke-width="18" stroke-linecap="round" opacity="0.82"/>
        <circle cx="784" cy="670" r="24" fill="${accent}" opacity="0.2"/>`
    }

    if (motif === 'spine') {
      return `
        <rect x="322" y="284" width="250" height="330" rx="44" fill="#ffffff" opacity="0.88"/>
        <circle cx="448" cy="382" r="76" fill="#ffe8ca"/>
        <path d="M448 468 V610" stroke="#ffe8ca" stroke-width="74" stroke-linecap="round"/>
        <path d="M446 462 C428 510, 476 552, 448 602" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round" opacity="0.38"/>
        <path d="M650 330 H884" stroke="${soft}" stroke-width="20" stroke-linecap="round"/>
        <path d="M674 452 C736 424, 812 424, 874 452" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <path d="M660 596 H900" stroke="${warm}" stroke-width="22" stroke-linecap="round" opacity="0.72"/>`
    }

    if (motif === 'knee') {
      return `
        <path d="M442 246 C530 318, 570 390, 568 474" fill="none" stroke="#ffe8ca" stroke-width="76" stroke-linecap="round"/>
        <path d="M620 482 C616 560, 656 634, 752 698" fill="none" stroke="#ffe8ca" stroke-width="76" stroke-linecap="round"/>
        <circle cx="584" cy="486" r="80" fill="#ffffff" opacity="0.86"/>
        <path d="M720 560 C784 522, 850 534, 900 594" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.36"/>
        <rect x="318" y="660" width="250" height="42" rx="20" fill="${soft}" opacity="0.9"/>
        <path d="M338 642 C430 598, 530 598, 622 642" fill="none" stroke="${warm}" stroke-width="18" stroke-linecap="round" opacity="0.74"/>
        <circle cx="782" cy="380" r="26" fill="${accent}" opacity="0.18"/>`
    }

    if (motif === 'feet') {
      return `
        <rect x="310" y="610" width="580" height="42" rx="21" fill="#1f2420" opacity="0.1"/>
        <ellipse cx="470" cy="472" rx="82" ry="166" fill="#ffe8ca" opacity="0.96" transform="rotate(-12 470 472)"/>
        <ellipse cx="704" cy="472" rx="82" ry="166" fill="#ffe8ca" opacity="0.82" transform="rotate(12 704 472)"/>
        <path d="M362 662 C456 626, 562 626, 660 664" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <path d="M712 662 C774 626, 826 626, 890 664" fill="none" stroke="${warm}" stroke-width="18" stroke-linecap="round" opacity="0.72"/>
        <rect x="328" y="278" width="218" height="86" rx="28" fill="#ffffff" opacity="0.78"/>
        <path d="M360 322 H510" stroke="${soft}" stroke-width="18" stroke-linecap="round"/>`
    }

    if (motif === 'sleep') {
      return `
        <rect x="332" y="420" width="470" height="168" rx="54" fill="#ffffff" opacity="0.82"/>
        <circle cx="500" cy="374" r="70" fill="#ffe8ca"/>
        <path d="M408 454 C470 510, 604 510, 668 454" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.3"/>
        <rect x="744" y="264" width="126" height="190" rx="28" fill="${soft}" opacity="0.9"/>
        <circle cx="806" cy="324" r="24" fill="${warm}" opacity="0.82"/>
        <path d="M720 638 C780 598, 842 598, 900 638" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <path d="M372 650 H610" stroke="${warm}" stroke-width="18" stroke-linecap="round" opacity="0.7"/>`
    }

    if (motif === 'allergy') {
      return `
        <rect x="322" y="304" width="232" height="292" rx="42" fill="#ffffff" opacity="0.86"/>
        <circle cx="420" cy="408" r="36" fill="${warm}" opacity="0.84"/>
        <circle cx="492" cy="468" r="28" fill="${accent}" opacity="0.24"/>
        <path d="M654 294 C734 258, 820 274, 886 338" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <circle cx="680" cy="452" r="26" fill="${warm}" opacity="0.78"/>
        <circle cx="772" cy="404" r="20" fill="${accent}" opacity="0.24"/>
        <circle cx="862" cy="486" r="24" fill="${warm}" opacity="0.64"/>
        <rect x="642" y="586" width="260" height="72" rx="28" fill="#ffffff" opacity="0.76"/>
        <path d="M674 622 H870" stroke="${soft}" stroke-width="18" stroke-linecap="round"/>`
    }

    if (motif === 'nutrition') {
      return `
        <circle cx="456" cy="438" r="122" fill="#ffffff" opacity="0.88"/>
        <path d="M456 316 A122 122 0 0 1 578 438 L456 438Z" fill="${accent}" opacity="0.3"/>
        <path d="M456 438 L578 438 A122 122 0 0 1 456 560Z" fill="${warm}" opacity="0.78"/>
        <path d="M456 438 L456 560 A122 122 0 0 1 334 438Z" fill="#4e8fd8" opacity="0.22"/>
        <path d="M662 310 C728 252, 824 252, 892 310" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" opacity="0.34"/>
        <circle cx="760" cy="424" r="40" fill="${warm}" opacity="0.82"/>
        <rect x="656" y="548" width="236" height="80" rx="30" fill="#ffffff" opacity="0.78"/>
        <path d="M688 586 H856" stroke="${soft}" stroke-width="18" stroke-linecap="round"/>`
    }
  }

  if (motif === 'eyes') {
    return `
      <path d="M346 438 C438 272, 762 272, 854 438 C762 604, 438 604, 346 438Z" fill="#ffffff" opacity="0.92"/>
      <circle cx="600" cy="438" r="92" fill="${accent}" opacity="0.74"/>
      <circle cx="600" cy="438" r="40" fill="#1f2420" opacity="0.7"/>
      <circle cx="632" cy="404" r="18" fill="#ffffff"/>
      <path d="M334 316 C426 246, 516 228, 600 244 C684 228, 774 246, 866 316" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round" opacity="0.28"/>
      ${isLifestyle ? '<rect x="292" y="594" width="238" height="82" rx="32" fill="#ffffff" opacity="0.78"/><rect x="562" y="594" width="238" height="82" rx="32" fill="#ffffff" opacity="0.56"/>' : '<circle cx="428" cy="612" r="28" fill="#4e8fd8" opacity="0.42"/><circle cx="778" cy="612" r="24" fill="#4e8fd8" opacity="0.3"/>'}`
  }

  if (motif === 'oral') {
    return `
      <path d="M500 250 C548 214, 600 256, 650 250 C724 240, 764 322, 742 420 L704 610 C694 662, 628 652, 622 598 L600 436 L578 598 C572 652, 506 662, 496 610 L458 420 C436 322, 426 240, 500 250Z" fill="#ffffff" opacity="0.94"/>
      <path d="M440 426 C530 462, 670 462, 760 426" fill="none" stroke="${accent}" stroke-width="24" stroke-linecap="round" opacity="0.35"/>
      <circle cx="464" cy="364" r="34" fill="${warm}" opacity="0.78"/>
      <circle cx="734" cy="362" r="34" fill="${warm}" opacity="0.52"/>
      ${isLifestyle ? '<path d="M318 618 C420 556, 512 544, 610 586" fill="none" stroke="#4e8fd8" stroke-width="18" stroke-linecap="round" opacity="0.45"/>' : '<path d="M318 570 L462 486" stroke="#4e8fd8" stroke-width="20" stroke-linecap="round" opacity="0.42"/>'}`
  }

  if (motif === 'nose') {
    return `
      <path d="M602 246 C520 342, 520 480, 626 514 C688 534, 760 500, 756 436 C752 378, 692 374, 674 326" fill="#ffe8ca" opacity="0.96"/>
      <circle cx="648" cy="458" r="26" fill="${accent}" opacity="0.34"/>
      <circle cx="720" cy="454" r="22" fill="${accent}" opacity="0.26"/>
      <path d="M330 350 C430 300, 520 304, 602 360" fill="none" stroke="${accent}" stroke-width="20" stroke-linecap="round" opacity="0.28"/>
      <circle cx="382" cy="538" r="32" fill="${warm}" opacity="0.74"/>
      <circle cx="836" cy="292" r="28" fill="${warm}" opacity="0.58"/>`
  }

  if (motif === 'scalp') {
    return `
      <path d="M416 370 C432 246, 768 246, 784 370 C720 310, 480 310, 416 370Z" fill="${accent}" opacity="0.44"/>
      <path d="M430 380 C500 334, 700 334, 770 380 L736 610 C720 684, 480 684, 464 610Z" fill="#ffe8ca" opacity="0.96"/>
      <path d="M458 302 C486 386, 510 430, 536 508" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" opacity="0.35"/>
      <path d="M600 286 C604 388, 606 470, 602 560" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" opacity="0.3"/>
      <path d="M742 304 C704 404, 676 474, 650 550" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" opacity="0.28"/>
      <circle cx="478" cy="610" r="20" fill="${warm}" opacity="0.72"/>
      <circle cx="730" cy="600" r="22" fill="${warm}" opacity="0.58"/>`
  }

  if (motif === 'neck') {
    return `
      <circle cx="486" cy="292" r="92" fill="#ffe8ca"/>
      <rect x="522" y="360" width="134" height="220" rx="60" fill="#ffe8ca"/>
      <path d="M600 372 C656 418, 676 500, 642 612" fill="none" stroke="${accent}" stroke-width="28" stroke-linecap="round" opacity="0.42"/>
      <rect x="710" y="268" width="188" height="112" rx="28" fill="#ffffff" opacity="0.78"/>
      <path d="M500 614 C582 668, 714 660, 798 610" fill="none" stroke="${soft}" stroke-width="30" stroke-linecap="round"/>
      ${isLifestyle ? '<rect x="290" y="548" width="170" height="96" rx="32" fill="#ffffff" opacity="0.72"/>' : '<path d="M744 430 L840 430" stroke="#4e8fd8" stroke-width="18" stroke-linecap="round" opacity="0.42"/>'}`
  }

  if (motif === 'thyroid') {
    return `
      <circle cx="600" cy="300" r="92" fill="#ffe8ca"/>
      <rect x="546" y="380" width="108" height="190" rx="54" fill="#ffe8ca"/>
      <path d="M506 458 C420 396, 354 500, 426 590 C498 680, 560 570, 560 492Z" fill="${accent}" opacity="0.42"/>
      <path d="M694 458 C780 396, 846 500, 774 590 C702 680, 640 570, 640 492Z" fill="${accent}" opacity="0.42"/>
      <circle cx="520" cy="530" r="22" fill="${warm}" opacity="0.75"/>
      <circle cx="680" cy="530" r="22" fill="${warm}" opacity="0.75"/>`
  }

  if (motif === 'gut') {
    return `
      <path d="M500 300 C566 236, 706 272, 710 392 C714 512, 586 518, 546 600 C486 552, 450 474, 458 390 C462 352, 476 322, 500 300Z" fill="${warm}" opacity="0.92"/>
      <path d="M438 640 C420 526, 522 500, 600 542 C688 588, 800 528, 780 640 C760 742, 468 742, 438 640Z" fill="#ffffff" opacity="0.82"/>
      <path d="M500 636 C558 590, 638 590, 700 636" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round" opacity="0.42"/>
      <circle cx="744" cy="338" r="22" fill="${accent}" opacity="0.38"/>
      ${isLifestyle ? '<rect x="290" y="268" width="150" height="110" rx="30" fill="#ffffff" opacity="0.72"/>' : '<path d="M434 290 C492 256, 542 250, 596 272" fill="none" stroke="#4e8fd8" stroke-width="18" stroke-linecap="round" opacity="0.36"/>'}`
  }

  if (motif === 'spine') {
    return `
      <path d="M600 232 C522 322, 696 388, 600 482 C512 568, 656 630, 590 710" fill="none" stroke="${accent}" stroke-width="34" stroke-linecap="round" opacity="0.44"/>
      ${[270, 330, 390, 450, 510, 570, 630].map((y, i) => `<circle cx="${i % 2 ? 632 : 574}" cy="${y}" r="24" fill="#ffffff" opacity="0.9"/>`).join('')}
      <path d="M370 322 L480 370" stroke="${soft}" stroke-width="24" stroke-linecap="round"/>
      <path d="M726 590 L840 538" stroke="${soft}" stroke-width="24" stroke-linecap="round"/>
      <rect x="310" y="600" width="154" height="68" rx="34" fill="${warm}" opacity="0.7"/>`
  }

  if (motif === 'knee') {
    return `
      <path d="M450 220 C548 306, 594 384, 594 476" fill="none" stroke="#ffe8ca" stroke-width="92" stroke-linecap="round"/>
      <path d="M674 474 C670 560, 704 636, 800 706" fill="none" stroke="#ffe8ca" stroke-width="92" stroke-linecap="round"/>
      <circle cx="614" cy="494" r="112" fill="#ffffff" opacity="0.84"/>
      <circle cx="614" cy="494" r="58" fill="${accent}" opacity="0.34"/>
      <path d="M466 494 C548 456, 682 456, 762 494" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round" opacity="0.45"/>
      ${isLifestyle ? '<path d="M350 700 C460 660, 560 656, 690 704" fill="none" stroke="#4e8fd8" stroke-width="20" stroke-linecap="round" opacity="0.42"/>' : '<path d="M766 360 L842 300" stroke="#4e8fd8" stroke-width="20" stroke-linecap="round" opacity="0.42"/>'}`
  }

  if (motif === 'feet') {
    return `
      <ellipse cx="500" cy="508" rx="116" ry="214" fill="#ffe8ca" opacity="0.96" transform="rotate(-14 500 508)"/>
      <ellipse cx="700" cy="508" rx="116" ry="214" fill="#ffe8ca" opacity="0.82" transform="rotate(14 700 508)"/>
      <path d="M390 608 C476 548, 574 544, 646 610" fill="none" stroke="${accent}" stroke-width="26" stroke-linecap="round" opacity="0.42"/>
      <circle cx="430" cy="290" r="30" fill="${accent}" opacity="0.34"/>
      <circle cx="500" cy="260" r="24" fill="${accent}" opacity="0.3"/>
      <circle cx="700" cy="260" r="24" fill="${accent}" opacity="0.3"/>
      <circle cx="770" cy="290" r="30" fill="${accent}" opacity="0.34"/>
      ${isLifestyle ? '<rect x="300" y="690" width="590" height="36" rx="18" fill="#1f2420" opacity="0.12"/>' : '<circle cx="600" cy="620" r="42" fill="#4e8fd8" opacity="0.22"/>'}`
  }

  if (motif === 'sleep') {
    return `
      <path d="M566 262 C494 382, 562 542, 704 580 C560 638, 388 548, 390 386 C392 284, 470 220, 566 262Z" fill="${warm}" opacity="0.95"/>
      <path d="M360 660 C454 604, 542 604, 626 660 C710 716, 812 716, 904 660" fill="none" stroke="${accent}" stroke-width="24" stroke-linecap="round" opacity="0.34"/>
      <path d="M360 552 C454 496, 542 496, 626 552 C710 608, 812 608, 904 552" fill="none" stroke="#4e8fd8" stroke-width="20" stroke-linecap="round" opacity="0.28"/>
      ${isLifestyle ? '<rect x="322" y="650" width="360" height="78" rx="36" fill="#ffffff" opacity="0.7"/>' : '<circle cx="804" cy="300" r="38" fill="#ffffff" opacity="0.76"/>'}`
  }

  if (motif === 'allergy') {
    return `
      <circle cx="600" cy="440" r="126" fill="#ffffff" opacity="0.86"/>
      ${[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x = 600 + Math.cos(rad) * 170
        const y = 440 + Math.sin(rad) * 170
        return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="42" fill="${accent}" opacity="0.25"/>`
      }).join('')}
      <path d="M540 442 L586 488 L676 382" fill="none" stroke="${accent}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" opacity="0.44"/>
      <circle cx="384" cy="284" r="30" fill="${warm}" opacity="0.7"/>
      <circle cx="816" cy="610" r="36" fill="${warm}" opacity="0.58"/>`
  }

  if (motif === 'nutrition') {
    return `
      <circle cx="600" cy="456" r="210" fill="#ffffff" opacity="0.86"/>
      <path d="M600 246 A210 210 0 0 1 810 456 L600 456Z" fill="${accent}" opacity="0.34"/>
      <path d="M600 456 L810 456 A210 210 0 0 1 600 666Z" fill="${warm}" opacity="0.84"/>
      <path d="M600 456 L600 666 A210 210 0 0 1 390 456Z" fill="#4e8fd8" opacity="0.24"/>
      <path d="M600 456 L390 456 A210 210 0 0 1 600 246Z" fill="${soft}" opacity="0.78"/>
      <circle cx="858" cy="256" r="44" fill="${warm}" opacity="0.85"/>
      <path d="M306 640 C370 596, 430 596, 494 640" fill="none" stroke="${accent}" stroke-width="20" stroke-linecap="round" opacity="0.38"/>`
  }

  return `
    <circle cx="600" cy="410" r="168" fill="${accent}" opacity="0.16"/>
    <circle cx="600" cy="410" r="112" fill="${warm}" opacity="0.92"/>
    <path d="M450 440 C500 290, 706 290, 754 440 C705 550, 500 550, 450 440Z" fill="#ffffff" opacity="0.88"/>
    <circle cx="548" cy="424" r="34" fill="${accent}" opacity="0.72"/>
    <circle cx="654" cy="424" r="34" fill="${accent}" opacity="0.42"/>`
}

function assetSvg(fileName, index) {
  const palette = palettes[index % palettes.length]
  const seed = hash(fileName)
  const left = 120 + (seed % 80)
  const right = 660 - (seed % 70)
  const top = 92 + (seed % 60)
  const bottom = 470 - (seed % 75)
  const motif = basename(fileName, '.webp').split('-')[0]

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette[0]}"/>
      <stop offset="100%" stop-color="#fffaf0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#1f2420" flood-opacity="0.13"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <circle cx="${left}" cy="${top}" r="150" fill="#ffffff" opacity="0.62"/>
  <circle cx="${right}" cy="${bottom}" r="210" fill="${palette[2]}" opacity="0.32"/>
  <rect x="190" y="168" width="820" height="560" rx="72" fill="#ffffff" opacity="0.72" filter="url(#shadow)"/>
  ${motifSvg(motif, palette, fileName)}
  <rect x="266" y="626" width="172" height="58" rx="29" fill="${palette[1]}" opacity="0.22"/>
  <rect x="766" y="214" width="172" height="58" rx="29" fill="${palette[1]}" opacity="0.18"/>
  <circle cx="902" cy="610" r="42" fill="#ffffff" opacity="0.82"/>
  <circle cx="290" cy="286" r="38" fill="#ffffff" opacity="0.82"/>
  <metadata>${motif}</metadata>
</svg>`
}

fileNames.forEach((fileName, index) => {
  const svgPath = resolve(tempDir, fileName.replace(/\.webp$/, '.svg'))
  const pngPath = resolve(tempDir, fileName.replace(/\.webp$/, '.png'))
  const webpPath = resolve(outputDir, fileName)

  writeFileSync(svgPath, assetSvg(fileName, index))
  execFileSync('sips', ['-s', 'format', 'png', svgPath, '--out', pngPath], { stdio: 'ignore' })
  execFileSync('/opt/homebrew/bin/cwebp', ['-quiet', '-q', '86', pngPath, '-o', webpPath])
})

rmSync(tempDir, { force: true, recursive: true })
console.log(`Generated ${fileNames.length} fallback WebP assets in ${outputDir}`)
