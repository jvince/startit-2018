# Startit vezbe

Ovaj repozitorijum sadrzi vezbe i primere iz Startit kursa, organizovane po nedeljama i danima. Materijali su uglavnom fokusirani na osnovni frontend rad sa HTML, CSS i JavaScript tehnologijama, uz primere koji koriste `axios`, `Mustache` i lokalne JSON podatke.

## Pregled

U repozitorijumu se nalaze tri glavna direktorijuma:

- `15-nedelja-sreda`
- `startit-16-nedelja-ponedeljak`
- `startit-16-nedelja-sreda`

Svaki direktorijum sadrzi vise primera u poddirektorijumima `html/primerX`, a neki primeri imaju i `docker` konfiguraciju za lokalno pokretanje kroz container-e.

## Sadrzaj

- jednostavne HTML stranice
- CSS stilizovanje
- JavaScript logika za prikaz i interakciju
- rad sa JSON podacima
- primeri sa templating-om i drag-and-drop interakcijom
- Docker i Nginx konfiguracija za lokalni razvoj

## Pokretanje

Za primere koji koriste Docker:

```bash
docker compose up --build
```

Zatim otvorite aplikaciju na `http://localhost`.

Za primere bez Dockera, otvorite odgovarajuci `index.html` fajl direktno u pregledacu ili preko lokalnog static servera.

## Napomena

Nazivi foldera prate raspored po nedeljama sa kursa, pa je najlaksi nacin za snalazenje da udjete u odgovarajuci direktorijum i otvorite konkretan `primer`.



