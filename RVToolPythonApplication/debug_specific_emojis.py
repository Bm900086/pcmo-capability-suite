#!/usr/bin/env python3
"""
Debug specific emoji sequences causing alignment issues
"""

def debug_problematic_emojis():
    """Debug the specific emojis causing issues."""
    
    problematic = [
        "🖥️  Total Hosts (Visible)",
        "⚙️  vCPUs per VM (Average)"
    ]
    
    print("Debugging Problematic Emoji Sequences:")
    print("=" * 60)
    
    for text in problematic:
        print(f"\nText: '{text}'")
        print(f"Length: {len(text)}")
        
        # Character by character analysis
        for i, char in enumerate(text):
            print(f"  [{i}] '{char}' = U+{ord(char):04X}")
        
        # Test different width calculation methods
        # Method 1: Simple emoji detection
        width1 = sum(2 if ord(c) >= 0x1F000 else 1 for c in text)
        print(f"Method 1 width: {width1}")
        
        # Method 2: With variation selector handling
        width2 = 0
        i = 0
        while i < len(text):
            char = text[i]
            if i + 1 < len(text) and ord(text[i + 1]) == 0xFE0F:  # Variation selector
                width2 += 2
                i += 2
            elif ord(char) >= 0x1F000 or ord(char) in range(0x2600, 0x27BF):
                width2 += 2
                i += 1
            else:
                width2 += 1
                i += 1
        print(f"Method 2 width: {width2}")
        
        # Method 3: Manual check for these specific cases
        # Check if the issue is in the space after emoji
        if "🖥️  " in text:  # Note: there are 2 spaces after the emoji
            print("  Found double space after 🖥️")
        if "⚙️  " in text:   # Note: there are 2 spaces after the emoji
            print("  Found double space after ⚙️")

def test_corrected_width():
    """Test with corrected width calculation."""
    
    print("\n\nTesting Corrected Width Calculation:")
    print("=" * 60)
    
    def corrected_width(text):
        width = 0
        i = 0
        while i < len(text):
            char = text[i]
            
            # Handle variation selector sequences
            if i + 1 < len(text) and ord(text[i + 1]) == 0xFE0F:
                width += 2  # Emoji + variation selector = 2 units total
                i += 2
                continue
            
            # Regular emoji ranges
            code_point = ord(char)
            if (0x1F300 <= code_point <= 0x1F5FF or  # Misc symbols including 🖥
                0x2600 <= code_point <= 0x26FF or   # Misc symbols including ⚙
                0x1F600 <= code_point <= 0x1F64F):  # Emoticons
                width += 2
            else:
                width += 1
            
            i += 1
        
        return width
    
    test_cases = [
        "📱 Total VMs (Powered On)",
        "📦 Total VMs (All Visible)",
        "🖥️  Total Hosts (Visible)",  # This one has issues
        "⚙️  vCPUs per VM (Average)"   # This one has issues
    ]
    
    for text in test_cases:
        width = corrected_width(text)
        target = 36
        padding = target - width
        if padding < 1:
            padding = 1
        
        pipe_pos = len(text) + padding
        print(f"'{text}' -> width:{width}, padding:{padding}, pipe_pos:{pipe_pos}")

if __name__ == "__main__":
    debug_problematic_emojis()
    test_corrected_width()
