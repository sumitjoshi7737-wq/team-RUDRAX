import os
import sys
import tkinter as tk

# Ensure project base directory is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from gui.app_gui import GauRakshakGUI

def main():
    print("=" * 60)
    print(" GAU RAKSHAK - Native Offline Voice Assistant")
    print(" Target System: Raspberry Pi 4 (Raspberry Pi OS)")
    print(" Team RUDRAX | GITS Udaipur")
    print("=" * 60)
    print("[Main] Launching Tkinter GUI interface...")

    root = tk.Tk()
    app = GauRakshakGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()
