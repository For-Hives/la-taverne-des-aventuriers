// Fige l'horloge du serveur Next (build et start) pour les tests visuels : chargé par NODE_OPTIONS=--import,
// actif seulement si DATE_FIGEE est défini. L'heure part de DATE_FIGEE puis avance normalement, pour que les
// minuteries et les délais de cache de Next continuent de fonctionner.
// Sert aux écrans qui dépendent du jour : année du pied de page, événements à venir, dates des battles.
const cible = process.env.DATE_FIGEE
if (cible) {
	const VraieDate = Date
	const decalage = VraieDate.parse(cible) - VraieDate.now()
	if (Number.isNaN(decalage)) throw new Error(`DATE_FIGEE illisible : ${cible}`)
	const maintenant = () => VraieDate.now() + decalage
	globalThis.Date = new Proxy(VraieDate, {
		apply: () => new VraieDate(maintenant()).toString(),
		construct: (Cible, args, nouvelleCible) =>
			Reflect.construct(Cible, args.length ? args : [maintenant()], nouvelleCible),
		get: (Cible, cle, recepteur) => (cle === 'now' ? maintenant : Reflect.get(Cible, cle, recepteur)),
	})
}
