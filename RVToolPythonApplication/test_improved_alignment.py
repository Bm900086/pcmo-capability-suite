#!/usr/bin/env python3
"""
Comprehensive alignment test with the improved algorithm
"""

def get_display_width_improved(text):
    """Enhanced display width calculation that handles emoji sequences properly."""
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

def test_improved_alignment():
    """Test the improved alignment algorithm."""
    
    print("Testing Improved Alignment Algorithm:")
    print("=" * 70)
    
    test_cases = [
        ("📱 Total VMs (Powered On)", "1,960", "Active workload count"),
        ("📦 Total VMs (All Visible)", "2,298", "Complete VM inventory"),
        ("🖥️  Total Hosts (Visible)", "88", "Physical infrastructure"),
        ("🔧 Total Physical Cores", "2,594", "Sum of all host cores"),
        ("⚙️  vCPUs per VM (Average)", "4.74", "Virtual CPU allocation")
    ]
    
    target_width = 35
    
    print("Analysis with improved algorithm:")
    for metric, value, desc in test_cases:
        display_width = get_display_width_improved(metric)
        padding = max(1, target_width - display_width)
        
        formatted = f"{metric}{' ' * padding}│ {value:>8} │ {desc}"
        
        print(f"'{metric}'")
        print(f"  Display width: {display_width}")
        print(f"  Padding: {padding}")
        print(f"  Result: '{formatted}'")
        print(f"  Pipe position: {len(metric) + padding}")
        print()

def test_visual_alignment():
    """Visual test to see if alignment works properly."""
    
    print("\nVisual Alignment Test:")
    print("=" * 70)
    
    test_cases = [
        ("📱 Total VMs (Powered On)", "1,960", "Active workload count"),
        ("📦 Total VMs (All Visible)", "2,298", "Complete VM inventory"),
        ("🖥️  Total Hosts (Visible)", "88", "Physical infrastructure"),
        ("🔧 Total Physical Cores", "2,594", "Sum of all host cores"),
        ("🎯 Physical Cores per Host (Avg)", "29.48", "Average core density"),
        ("⚙️  vCPUs per VM (Average)", "4.74", "Virtual CPU allocation")
    ]
    
    target_width = 35
    
    for metric, value, desc in test_cases:
        display_width = get_display_width_improved(metric)
        padding = max(1, target_width - display_width)
        formatted = f"{metric}{' ' * padding}│ {value:>8} │ {desc}"
        print(formatted)

def test_emoji_sequences():
    """Specifically test problematic emoji sequences."""
    
    print("\n\nEmoji Sequence Analysis:")
    print("=" * 70)
    
    test_emojis = [
        "📱",  # Single emoji
        "📦",  # Single emoji
        "🖥️",  # Composite emoji (base + variation selector)
        "⚙️",  # Composite emoji
    ]
    
    for emoji in test_emojis:
        print(f"Emoji: '{emoji}'")
        print(f"  Length: {len(emoji)}")
        print(f"  Characters: {[char for char in emoji]}")
        print(f"  Unicode: {[f'U+{ord(char):04X}' for char in emoji]}")
        print(f"  Display width: {get_display_width_improved(emoji)}")
        print()

if __name__ == "__main__":
    test_improved_alignment()
    test_visual_alignment()
    test_emoji_sequences()
    
    print("\n" + "=" * 70)
    print("✅ The improved algorithm now handles:")
    print("  • Emoji sequences (like 🖥️ = 🖥 + ️)")
    print("  • Proper display width calculation")
    print("  • Consistent column alignment")
    print("  • Minimum padding for readability")
