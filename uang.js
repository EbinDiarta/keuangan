function downloadCSV(data, filename = "riwayat_transaksi.csv") {
    if (!data.length) return alert("Tidak ada data transaksi.");
    const keys = Object.keys(data[0]);
    const header = keys.join(",");
    const rows = data.map(obj => keys.map(k => `"${String(obj[k]).replace(/"/g, '""')}"`).join(","));
    const csv = "\uFEFF" + header + "\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function downloadXLSX(data, filename = "riwayat_transaksi_ebin.xlsx") {
    if (!data.length) return alert("Tidak ada data transaksi.");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transaksi");
    XLSX.writeFile(wb, filename);
}
