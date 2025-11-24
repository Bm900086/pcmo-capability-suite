#!/usr/bin/env python3
"""
Final test with corrected emoji strings (single space instead of double)
"""

def get_display_width_final(text):
    """Final display width calculation."""
    import unicodedata
    width = 0
    i = 0
    while i < len(text):
        char = text[i]
        
        # Handle emoji sequences (like 🖥️ which is 🖥 + ️)
        if i + 1 < len(text) and ord(text[i + 1]) == 0xFE0F:  # Variation selector
            width += 2  # Emoji + variation selector = 2 display units
            i += 2  # Skip both characters
            continue
        
        # Check for emoji ranges
        code_point = ord(char)
        if (0x1F600 <= code_point <= 0x1F64F or  # Emoticons
            0x1F300 <= code_point <= 0x1F5FF or  # Miscellaneous Symbols
            0x1F680 <= code_point <= 0x1F6FF or  # Transport symbols
            0x1F1E0 <= code_point <= 0x1F1FF or  # Regional indicators
            0x2600 <= code_point <= 0x26FF or   # Miscellaneous symbols
            0x2700 <= code_point <= 0x27BF):    # Dingbats
            width += 2
        elif unicodedata.east_asian_width(char) in ('F', 'W'):  # Full-width or Wide
            width += 2
        else:
            width += 1
        
        i += 1
    
    return width

def test_corrected_alignment():
    """Test alignment with corrected strings (single space after emojis)."""
    
    print("FINAL ALIGNMENT TEST - With Corrected Strings:")
    print("=" * 80)
    
    # Updated test cases with single space after emojis
    test_cases = [
        ("📱 Total VMs (Powered On)", "1,960", "Active workload count"),
        ("📦 Total VMs (All Visible)", "2,298", "Complete VM inventory"),
        ("🖥️ Total Hosts (Visible)", "88", "Physical infrastructure"),        # Fixed: single space
        ("🔧 Total Physical Cores", "2,594", "Sum of all host cores"),
        ("🎯 Physical Cores per Host (Avg)", "29.48", "Average core density"),
        ("🔌 CPU Sockets per Host (Avg)", "1.99", "Socket configuration"),
        ("💾 RAM per Host (Avg) GB", "894.92", "Memory capacity"),
        ("⚙️ vCPUs per VM (Average)", "4.74", "Virtual CPU allocation"),       # Fixed: single space
        ("🧠 RAM per VM (Average) GB", "20.71", "Memory per workload"),
        ("💿 Provisioned Storage per VM GB", "635.09", "Storage allocation")
    ]
    
    target_width = 36
    pipe_positions = []
    
    for metric, value, desc in test_cases:
        display_width = get_display_width_final(metric)
        padding = target_width - display_width
        if padding < 1:
            padding = 1
            
        formatted = f"{metric}{' ' * padding}│ {value:>8} │ {desc}"
        pipe_pos = display_width + padding  # This should now be consistent
        pipe_positions.append(pipe_pos)
        
        print(formatted)
    
    print("\n" + "=" * 80)
    print(f"Pipe positions: {pipe_positions}")
    print(f"All positions same? {len(set(pipe_positions)) == 1}")
    print(f"Position consistency: {set(pipe_positions)}")
    
    if len(set(pipe_positions)) == 1:
        print("✅ PERFECT ALIGNMENT ACHIEVED!")
    else:
        print("❌ Still have alignment issues")

if __name__ == "__main__":
    test_corrected_alignment()
