using SharpKit.JavaScript;

namespace AlphaSynth.Util
{
    static class Extensions
    {
        [JsMethod(InlineCodeExpression = "o[s]", Export = false)]
        public static object Member(this object o, string s)
        {
            return null;
        }
    }
}
