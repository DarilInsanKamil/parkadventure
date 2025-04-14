export function formatRupiah(
  number: number,
  withSymbol = true,
  withSpace = true
) {
  // Pastikan input adalah angka
  if (isNaN(number)) {
    return "Input harus berupa angka";
  }

  // Format angka dengan pemisah ribuan berupa titik dan desimal berupa koma
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  // Tambahkan simbol Rupiah jika diperlukan
  if (withSymbol) {
    return `Rp${withSpace ? " " : ""}${formattedNumber}`;
  }

  return formattedNumber;
}
